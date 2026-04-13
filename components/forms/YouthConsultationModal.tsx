'use client';

import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  X, ChevronRight, ChevronLeft, Check,
  AlertTriangle, Phone, MapPin,
} from 'lucide-react';
import { submitYouthConsultation } from '@/app/counseling/young-adult/actions';
import { trackGenerateLead } from '@/lib/analytics/gtag';

// ── 상수 ──
const CONCERN_OPTIONS = [
  { value: '진로/직장 (취업, 이직, 직장 내 스트레스)', label: '진로/직장 (취업, 이직, 직장 내 스트레스)' },
  { value: '대인관계 (가족, 연인, 친구와의 갈등)', label: '대인관계 (가족, 연인, 친구와의 갈등)' },
  { value: '우울/불안 (우울감, 불안, 무기력)', label: '우울/불안 (우울감, 불안, 무기력)' },
  { value: '자기이해 (자존감, 정체성)', label: '자기이해 (자존감, 정체성)' },
  { value: '기타 (일상에서 설명하기 어려운 심리적 불편감)', label: '기타 (일상에서 설명하기 어려운 심리적 불편감)' },
];

const DAY_OPTIONS = [
  { value: '월', label: '월' },
  { value: '화', label: '화' },
  { value: '수', label: '수' },
  { value: '목', label: '목' },
  { value: '금', label: '금' },
  { value: '토', label: '토' },
];

const TIME_OPTIONS = [
  { value: '오전 (10시~12시)', label: '오전 (10시~12시)' },
  { value: '오후 초반 (12시~15시)', label: '오후 초반 (12시~15시)' },
  { value: '오후 후반 (15시~17시)', label: '오후 후반 (15시~17시)' },
  { value: '저녁 (17시~21시)', label: '저녁 (17시~21시)' },
];

const GENDER_OPTIONS = [
  { value: '남성', label: '남성' },
  { value: '여성', label: '여성' },
  { value: '기타', label: '기타' },
];

// ── Zod 스키마 ──
const formSchema = z.object({
  concerns: z.array(z.string()).min(1, '고민을 선택해주세요'),
  additionalDescription: z.string().optional(),
  hasSuicidalRisk: z.boolean(),
  hasPsychiatricTreatment: z.boolean(),
  consultationType: z.enum(['대면', '비대면', '상관없음'], { error: '상담 방식을 선택해주세요' }),
  preferredRegion: z.string().optional(),
  availableDays: z.array(z.string()).min(1, '가능한 요일을 선택해주세요'),
  availableTimes: z.array(z.string()).min(1, '가능한 시간대를 선택해주세요'),
  name: z.string({ error: '이름을 입력해주세요' }).min(2, '이름은 2글자 이상 입력해주세요'),
  phone: z.string({ error: '연락처를 입력해주세요' }).regex(/^01[0-9]-?[0-9]{4}-?[0-9]{4}$/, '올바른 연락처를 입력해주세요'),
  birthYear: z.string({ error: '출생연도를 입력해주세요' })
    .min(4, '출생연도 4자리를 입력해주세요')
    .refine(
      (val) => {
        const year = parseInt(val, 10);
        return !isNaN(year) && year >= 1987 && year <= 2007;
      },
      { message: '2030 청년상담은 1987~2007년생을 위한 프로그램입니다. 출생연도를 다시 확인해 주세요.' },
    ),
  gender: z.enum(['남성', '여성', '기타'], { error: '성별을 선택해주세요' }),
  agreePrivacy: z.literal(true, { error: '개인정보 수집 및 제3자 제공에 동의해주세요' }),
});

type FormData = z.infer<typeof formSchema>;

const TOTAL_STEPS = 3;

interface YouthConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function YouthConsultationModal({ isOpen, onClose }: YouthConsultationModalProps) {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showCrisisAlert, setShowCrisisAlert] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [step3Attempted, setStep3Attempted] = useState(false);

  const {
    register,
    watch,
    setValue,
    getValues,
    formState: { errors },
    trigger,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      availableDays: [],
      availableTimes: [],
      concerns: [],
      hasSuicidalRisk: false,
      hasPsychiatricTreatment: false,
      agreePrivacy: false as unknown as true,
    },
  });

  const watchedValues = watch();

  // body 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleNext = async () => {
    let fieldsToValidate: (keyof FormData)[] = [];
    if (step === 1) fieldsToValidate = ['concerns'];
    else if (step === 2) fieldsToValidate = ['consultationType', 'availableDays', 'availableTimes'];

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      if (step === 1 && watchedValues.hasSuicidalRisk) {
        setShowCrisisAlert(true);
        return;
      }
      setStep(step + 1);
    }
  };

  const handleBack = () => { if (step > 1) setStep(step - 1); };

  const handleSubmit = async () => {
    setStep3Attempted(true);
    const isValid = await trigger(['name', 'phone', 'birthYear', 'gender', 'agreePrivacy']);
    if (!isValid) return;

    setIsSubmitting(true);
    setSubmitError(null);

    const data = getValues();
    const result = await submitYouthConsultation(data);

    if (result.success) {
      setIsSubmitted(true);
      trackGenerateLead('2030 청년상담');
    } else {
      setSubmitError(result.error ?? '신청 중 오류가 발생했습니다.');
    }
    setIsSubmitting(false);
  };

  const handleClose = useCallback(() => {
    setStep(1);
    setIsSubmitted(false);
    setShowCrisisAlert(false);
    setSubmitError(null);
    setStep3Attempted(false);
    reset();
    onClose();
  }, [onClose, reset]);

  const toggleArrayValue = (field: 'availableDays' | 'availableTimes' | 'concerns', value: string) => {
    const current = watchedValues[field] || [];
    const newValue = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    setValue(field, newValue, { shouldValidate: true });
  };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Crisis Alert */}
          <AnimatePresence>
            {showCrisisAlert && (
              <motion.div
                className="absolute inset-0 z-[60] flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="rounded-2xl border border-[#e6e9e5] bg-white p-8 max-w-md mx-auto text-center shadow-xl">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
                    <AlertTriangle className="h-8 w-8 text-amber-500" />
                  </div>
                  <h3 className="mb-4 text-xl font-bold text-[#2f3331]">위기상담 안내</h3>
                  <p className="mb-6 leading-relaxed text-[#5c605d]">
                    자살 위기나 심각한 자해 위험이 있으신 경우,<br />
                    즉각적인 전문 지원이 필요합니다.
                  </p>
                  <div className="mb-6 rounded-xl bg-[#f0f5f2] p-4">
                    <p className="mb-2 text-sm text-[#5c605d]">24시간 위기상담 전화</p>
                    <a href="tel:1393" className="flex items-center justify-center gap-2 text-xl font-bold text-[#2d6a4f]">
                      <Phone className="h-5 w-5" />
                      1393 (자살예방상담전화)
                    </a>
                  </div>
                  <button
                    onClick={() => { setShowCrisisAlert(false); setStep(2); }}
                    className="text-sm text-[#5c605d] transition-colors hover:text-[#2f3331]"
                  >
                    닫기
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Modal */}
          <motion.div
            className="relative flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-[#e6e9e5] bg-white shadow-2xl"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
          >
            {/* Header */}
            <div className="flex-shrink-0 border-b border-[#e6e9e5] bg-white px-6 py-4">
              <div className="mb-4 flex items-center justify-between">
                <span className="font-bold text-[#2d6a4f]">2030 청년상담 신청</span>
                <button
                  onClick={handleClose}
                  className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-[#f3f4f0]"
                >
                  <X className="h-5 w-5 text-[#5c605d]" />
                </button>
              </div>
              {!isSubmitted && (
                <div className="flex gap-2">
                  {[1, 2, 3].map((s) => (
                    <div
                      key={s}
                      className={`h-1 flex-1 rounded-full transition-colors ${
                        s <= step ? 'bg-[#2d6a4f]' : 'bg-[#e6e9e5]'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Content */}
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-1 flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto p-6">
                <AnimatePresence mode="wait">
                  {/* ── Step 1: 고민 / 스크리닝 ── */}
                  {step === 1 && !isSubmitted && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-xl font-bold text-[#2f3331]">상담 주제</h3>
                        <p className="mt-1 text-sm text-[#5c605d]">어떤 고민으로 상담을 원하시나요?</p>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="mb-2 block text-sm font-medium text-[#5c605d]">
                            해당하는 고민을 선택해주세요 (복수 선택)
                          </label>
                          <div className="space-y-2">
                            {CONCERN_OPTIONS.map((concern) => (
                              <button
                                key={concern.value}
                                type="button"
                                onClick={() => toggleArrayValue('concerns', concern.value)}
                                className={`flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3 text-left transition-all ${
                                  watchedValues.concerns?.includes(concern.value)
                                    ? 'border-[#2d6a4f] bg-[#2d6a4f]/10'
                                    : 'border-[#e6e9e5] hover:border-[#2d6a4f]/50'
                                }`}
                              >
                                <div
                                  className={`flex h-5 w-5 items-center justify-center rounded-md border-2 transition-all ${
                                    watchedValues.concerns?.includes(concern.value)
                                      ? 'border-[#2d6a4f] bg-[#2d6a4f]'
                                      : 'border-[#b0b5b1]'
                                  }`}
                                >
                                  {watchedValues.concerns?.includes(concern.value) && (
                                    <Check className="h-3 w-3 text-white" />
                                  )}
                                </div>
                                <span className={watchedValues.concerns?.includes(concern.value) ? 'text-[#1f5e44]' : 'text-[#5c605d]'}>
                                  {concern.label}
                                </span>
                              </button>
                            ))}
                          </div>
                          {errors.concerns && <p className="mt-1 text-sm text-red-500">{errors.concerns.message}</p>}
                        </div>

                        <div>
                          <label className="mb-2 block text-sm font-medium text-[#5c605d]">부가 설명 (선택)</label>
                          <textarea
                            {...register('additionalDescription')}
                            className="h-24 w-full resize-none rounded-xl border border-[#e6e9e5] bg-white px-4 py-3 text-[#2f3331] placeholder-[#b0b5b1] outline-none transition-all focus:border-[#2d6a4f] focus:ring-2 focus:ring-[#2d6a4f]/20"
                            placeholder="상담사에게 미리 전달하고 싶은 내용이 있다면 적어주세요."
                          />
                        </div>

                        <div className="border-t border-[#e6e9e5] pt-4">
                          <p className="mb-4 text-sm font-medium text-[#5c605d]">사전 확인 질문</p>
                          <div className="space-y-3">
                            <label className="flex cursor-pointer items-center gap-3 rounded-xl bg-[#f9f9f6] p-3">
                              <input type="checkbox" {...register('hasSuicidalRisk')} className="h-4 w-4 rounded border-[#e6e9e5] text-[#2d6a4f] focus:ring-[#2d6a4f]" />
                              <span className="text-sm text-[#5c605d]">자살 위기나 심각한 자해 위험이 있습니다.</span>
                            </label>
                            <label className="flex cursor-pointer items-center gap-3 rounded-xl bg-[#f9f9f6] p-3">
                              <input type="checkbox" {...register('hasPsychiatricTreatment')} className="h-4 w-4 rounded border-[#e6e9e5] text-[#2d6a4f] focus:ring-[#2d6a4f]" />
                              <span className="text-sm text-[#5c605d]">현재 정신과 진료 또는 약물 복용 중입니다.</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* ── Step 2: 상담 방식 / 일정 ── */}
                  {step === 2 && !isSubmitted && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-xl font-bold text-[#2f3331]">상담 방식 및 일정</h3>
                        <p className="mt-1 text-sm text-[#5c605d]">상담은 매주 같은 요일/시간에 진행됩니다.</p>
                      </div>

                      <div className="space-y-4">
                        {/* 상담 방식 */}
                        <div>
                          <label className="mb-2 block text-sm font-medium text-[#5c605d]">상담 방식</label>
                          <div className="grid grid-cols-3 gap-2">
                            {[
                              { value: '대면', label: '대면' },
                              { value: '비대면', label: '비대면' },
                              { value: '상관없음', label: '상관없음' },
                            ].map((option) => (
                              <label
                                key={option.value}
                                className={`cursor-pointer rounded-xl border-2 px-4 py-3 text-center transition-all ${
                                  watchedValues.consultationType === option.value
                                    ? 'border-[#2d6a4f] bg-[#2d6a4f]/10 text-[#1f5e44]'
                                    : 'border-[#e6e9e5] text-[#5c605d] hover:border-[#2d6a4f]/50'
                                }`}
                              >
                                <input type="radio" value={option.value} {...register('consultationType')} className="sr-only" />
                                {option.label}
                              </label>
                            ))}
                          </div>
                          {errors.consultationType && <p className="mt-1 text-sm text-red-500">{errors.consultationType.message}</p>}
                        </div>

                        {/* 대면 안내 */}
                        {(watchedValues.consultationType === '대면' || watchedValues.consultationType === '상관없음') && (
                          <div className="rounded-xl border border-[#2d6a4f]/20 bg-[#2d6a4f]/5 p-4">
                            <p className="mb-3 text-sm text-[#5c605d]">대면 상담은 합정역 5분 거리의 상담 센터에서 진행됩니다.</p>
                            <a
                              href="https://map.naver.com/p/search/%EC%84%9C%EC%9A%B8%EC%8B%9C%20%EB%A7%88%ED%8F%AC%EA%B5%AC%20%EC%9E%94%EB%8B%A4%EB%A6%AC%EB%A1%9C%2073"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-lg bg-[#2d6a4f]/10 px-4 py-2 text-sm font-medium text-[#1f5e44] transition-colors hover:bg-[#2d6a4f]/20"
                            >
                              <MapPin className="h-4 w-4" />
                              지도 보기
                            </a>
                          </div>
                        )}

                        {/* 요일 */}
                        <div>
                          <label className="mb-2 block text-sm font-medium text-[#5c605d]">가능한 요일 (복수 선택)</label>
                          <div className="flex flex-wrap gap-2">
                            {DAY_OPTIONS.map((day) => (
                              <button
                                key={day.value}
                                type="button"
                                onClick={() => toggleArrayValue('availableDays', day.value)}
                                className={`rounded-full border-2 px-4 py-2 text-sm font-medium transition-all ${
                                  watchedValues.availableDays?.includes(day.value)
                                    ? 'border-[#2d6a4f] bg-[#2d6a4f] text-white'
                                    : 'border-[#e6e9e5] text-[#5c605d] hover:border-[#2d6a4f]/50'
                                }`}
                              >
                                {day.label}
                              </button>
                            ))}
                          </div>
                          {errors.availableDays && <p className="mt-1 text-sm text-red-500">{errors.availableDays.message}</p>}
                        </div>

                        {/* 시간대 */}
                        <div>
                          <label className="mb-2 block text-sm font-medium text-[#5c605d]">가능한 시간대 (복수 선택)</label>
                          <div className="space-y-2">
                            {TIME_OPTIONS.map((time) => (
                              <button
                                key={time.value}
                                type="button"
                                onClick={() => toggleArrayValue('availableTimes', time.value)}
                                className={`w-full rounded-xl border-2 px-4 py-3 text-left transition-all ${
                                  watchedValues.availableTimes?.includes(time.value)
                                    ? 'border-[#2d6a4f] bg-[#2d6a4f]/10 text-[#1f5e44]'
                                    : 'border-[#e6e9e5] text-[#5c605d] hover:border-[#2d6a4f]/50'
                                }`}
                              >
                                {time.label}
                              </button>
                            ))}
                          </div>
                          {errors.availableTimes && <p className="mt-1 text-sm text-red-500">{errors.availableTimes.message}</p>}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* ── Step 3: 기본 정보 ── */}
                  {step === 3 && !isSubmitted && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-xl font-bold text-[#2f3331]">기본 정보</h3>
                        <p className="mt-1 text-sm text-[#5c605d]">상담 연락을 위해 정보를 입력해주세요.</p>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="mb-1 block text-sm font-medium text-[#5c605d]">이름</label>
                          <input
                            {...register('name')}
                            className="w-full rounded-xl border border-[#e6e9e5] bg-white px-4 py-3 text-[#2f3331] placeholder-[#b0b5b1] outline-none transition-all focus:border-[#2d6a4f] focus:ring-2 focus:ring-[#2d6a4f]/20"
                            placeholder="홍길동"
                          />
                          {step3Attempted && errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
                        </div>

                        <div>
                          <label className="mb-1 block text-sm font-medium text-[#5c605d]">연락처</label>
                          <input
                            {...register('phone')}
                            className="w-full rounded-xl border border-[#e6e9e5] bg-white px-4 py-3 text-[#2f3331] placeholder-[#b0b5b1] outline-none transition-all focus:border-[#2d6a4f] focus:ring-2 focus:ring-[#2d6a4f]/20"
                            placeholder="010-1234-5678"
                          />
                          {step3Attempted && errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>}
                        </div>

                        <div>
                          <label className="mb-1 block text-sm font-medium text-[#5c605d]">출생연도</label>
                          <input
                            {...register('birthYear')}
                            type="number"
                            className="w-full rounded-xl border border-[#e6e9e5] bg-white px-4 py-3 text-[#2f3331] placeholder-[#b0b5b1] outline-none transition-all focus:border-[#2d6a4f] focus:ring-2 focus:ring-[#2d6a4f]/20"
                            placeholder="1995"
                          />
                          <p className="mt-1 text-xs text-[#8a8f8b]">신청 가능 연령 : 1987년생 ~ 2007년생</p>
                          {step3Attempted && errors.birthYear && <p className="mt-1 text-sm text-red-500">{errors.birthYear.message}</p>}
                        </div>

                        <div>
                          <label className="mb-1 block text-sm font-medium text-[#5c605d]">성별</label>
                          <div className="flex gap-3">
                            {GENDER_OPTIONS.map((option) => (
                              <label
                                key={option.value}
                                className={`flex-1 cursor-pointer rounded-xl border-2 px-4 py-3 text-center transition-all ${
                                  watchedValues.gender === option.value
                                    ? 'border-[#2d6a4f] bg-[#2d6a4f]/10 text-[#1f5e44]'
                                    : 'border-[#e6e9e5] text-[#5c605d] hover:border-[#2d6a4f]/50'
                                }`}
                              >
                                <input type="radio" value={option.value} {...register('gender')} className="sr-only" />
                                {option.label}
                              </label>
                            ))}
                          </div>
                          {step3Attempted && errors.gender && <p className="mt-1 text-sm text-red-500">{errors.gender.message}</p>}
                        </div>

                        {/* 개인정보 동의 */}
                        <div className="border-t border-[#e6e9e5] pt-4">
                          <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-[#e6e9e5] bg-[#f9f9f6] p-4">
                            <input
                              type="checkbox"
                              {...register('agreePrivacy')}
                              className="mt-0.5 h-4 w-4 rounded border-[#e6e9e5] text-[#2d6a4f] focus:ring-[#2d6a4f]"
                            />
                            <span className="text-sm leading-relaxed text-[#5c605d]">
                              심리상담 진행을 위한 개인정보 수집 및 활용, 제3자 제공(상담사)에 동의합니다.
                            </span>
                          </label>
                          {step3Attempted && errors.agreePrivacy && <p className="mt-1 text-sm text-red-500">{errors.agreePrivacy.message}</p>}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* ── 완료 ── */}
                  {isSubmitted && (
                    <motion.div
                      key="submitted"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-6 py-8 text-center"
                    >
                      <motion.div
                        className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#2d6a4f]/30 bg-[#b1f0ce]/30"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', delay: 0.2 }}
                      >
                        <Check className="h-10 w-10 text-[#2d6a4f]" />
                      </motion.div>
                      <h3 className="text-xl font-bold text-[#2f3331]">신청이 완료되었습니다.</h3>
                      <p className="text-[#5c605d]">
                        담당 상담사가<br />
                        <span className="font-medium text-[#2d6a4f]">48시간 내로</span> 연락드릴 예정입니다.
                      </p>
                      <button
                        type="button"
                        onClick={handleClose}
                        className="rounded-xl bg-[#2d6a4f] px-8 py-3 font-medium text-white transition-colors hover:bg-[#1f5e44]"
                      >
                        확인
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer */}
              {!isSubmitted && (
                <div className="flex-shrink-0 border-t border-[#e6e9e5] bg-white px-6 py-4">
                  {submitError && <p className="mb-3 text-center text-sm text-red-500">{submitError}</p>}
                  <div className="flex gap-3">
                    {step > 1 && (
                      <button
                        type="button"
                        onClick={handleBack}
                        disabled={isSubmitting}
                        className="flex items-center justify-center gap-1 rounded-xl border border-[#e6e9e5] px-6 py-3 text-[#5c605d] transition-colors hover:bg-[#f3f4f0] disabled:opacity-50"
                      >
                        <ChevronLeft className="h-4 w-4" />
                        이전
                      </button>
                    )}
                    {step < TOTAL_STEPS ? (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="flex flex-1 items-center justify-center gap-1 rounded-xl bg-[#2d6a4f] py-3 font-medium text-white transition-colors hover:bg-[#1f5e44]"
                      >
                        다음
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="flex-1 rounded-xl bg-[#2d6a4f] py-3 font-semibold text-white transition-colors hover:bg-[#1f5e44] disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {isSubmitting ? '신청 중...' : '신청 완료'}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
