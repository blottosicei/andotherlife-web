#!/usr/bin/env node
/**
 * Meta 광고 소재 이미지 생성 스크립트
 *
 * 사용법:
 *   node scripts/generate-ad-images.mjs                # 전체 생성
 *   node scripts/generate-ad-images.mjs --set 1        # Ad Set 1만 생성
 *   node scripts/generate-ad-images.mjs --set 1 --ad A # Ad Set 1의 소재 A만 생성
 *   node scripts/generate-ad-images.mjs --composite-only # 배경 이미지는 건너뛰고 텍스트 합성만
 *
 * 환경 변수:
 *   NANOBANANA_API_KEY  — .env.local에서 자동 로드 (Gemini API 키)
 *
 * 모델: gemini-3.1-flash-image-preview
 * 출력: marketing/campaigns/meta/young-adult-counseling/creatives/
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

// ── 설정 ──────────────────────────────────────────────
const API_BASE = "https://generativelanguage.googleapis.com/v1beta/models";
const MODEL = "gemini-3.1-flash-image-preview";
const SIZE = 1200;
const OUTPUT_DIR = path.join(ROOT, "marketing/campaigns/meta/young-adult-counseling/creatives");
const BG_DIR = path.join(OUTPUT_DIR, "backgrounds");
const LOGO_PATH = path.join(ROOT, "public/images/logo-text.webp");

// 브랜드 컬러
const ACCENT_COLOR = "#fdae8f"; // 피치 (Tertiary Container)
const PRIMARY_COLOR = "#b1f0ce"; // 라이트 그린 (Primary Container)

// .env.local에서 API 키 로드
function loadApiKey() {
  const envPath = path.join(ROOT, ".env.local");
  if (!fs.existsSync(envPath)) {
    console.error("❌ .env.local 파일을 찾을 수 없습니다.");
    process.exit(1);
  }
  const content = fs.readFileSync(envPath, "utf-8");
  const match = content.match(/NANOBANANA_API_KEY=(.+)/);
  if (!match || !match[1].trim()) {
    console.error("❌ .env.local에 NANOBANANA_API_KEY가 설정되지 않았습니다.");
    process.exit(1);
  }
  return match[1].trim();
}

// ── 광고 소재 데이터 ──────────────────────────────────
// highlight: 포인트 컬러로 강조할 단어들
const AD_SETS = [
  {
    id: 1,
    name: "burnout",
    label: "번아웃/직장 스트레스",
    bgPrompt:
      "A soft, melancholic photograph of an empty office desk at dusk, warm golden light filtering through window blinds, a single coffee cup left behind, shallow depth of field, muted warm tones with slight desaturation, editorial photography style, no text, no people, calming yet lonely atmosphere",
    ads: [
      { id: "A", headline: "출근길이 무서워진 건\n언제부터였을까", sub: "첫 상담 무료 · 회당 2만원", highlight: ["무서워진"] },
      { id: "B", headline: "일요일 밤마다\n가슴이 답답한 당신에게", sub: "혼자 고민하지 마세요", highlight: ["답답한"] },
      { id: "C", headline: "퇴사할까 버틸까,\n혼자 고민하고 있다면", sub: "전문 상담사와 함께 정리해보세요", highlight: ["혼자"] },
      { id: "D", headline: "회사에선 괜찮은 척,\n집에선 아무것도\n못 하겠어요", sub: "첫 상담 무료 · 기록에 남지 않습니다", highlight: ["괜찮은 척"] },
    ],
  },
  {
    id: 2,
    name: "breakup",
    label: "이별/연애 고민",
    bgPrompt:
      "A dreamy, soft-focus photograph of a rainy window at night with blurred city lights in the background, raindrops on glass creating bokeh effects, pastel blue and warm amber tones, intimate and reflective mood, cinematic still life, no text, no people",
    ads: [
      { id: "A", headline: "괜찮다고 했는데,\n아직도 그 노래를\n못 듣겠어요", sub: "첫 상담 무료 · 회당 2만원", highlight: ["못 듣겠어요"] },
      { id: "B", headline: "헤어지면\n달라질 줄 알았는데,\n여전히 힘들어요", sub: "전문 상담사와 함께 정리해보세요", highlight: ["여전히"] },
      { id: "C", headline: "매번 비슷한 연애를\n반복하고 있다면", sub: "나의 관계 패턴, 함께 들여다봐요", highlight: ["반복"] },
      { id: "D", headline: "혼자가 되면 불안하고,\n함께 있으면 지치나요", sub: "첫 상담 무료 · 기록에 남지 않습니다", highlight: ["불안", "지치나요"] },
    ],
  },
  {
    id: 3,
    name: "depression",
    label: "우울/무기력/감정 조절",
    bgPrompt:
      "A serene, contemplative photograph of soft morning light falling on an unmade bed with white linen, gentle shadows, a small potted plant on the windowsill slightly out of focus, muted sage green and cream tones, quiet and introspective atmosphere, editorial style, no text, no people",
    ads: [
      { id: "A", headline: "딱히 이유는 없는데,\n매일이 무거워요", sub: "첫 상담 무료 · 회당 2만원", highlight: ["무거워요"] },
      { id: "B", headline: "웃고 있는데\n왜 눈물이 나는 걸까", sub: "혼자 안고 있지 않아도 됩니다", highlight: ["눈물"] },
      { id: "C", headline: "좋아하던 것도 이제\n아무 감흥이 없어요", sub: "전문 상담사와 이야기해보세요", highlight: ["아무 감흥이"] },
      { id: "D", headline: "괜찮다가도\n갑자기 무너지는 하루들", sub: "첫 상담 무료 · 기록에 남지 않습니다", highlight: ["무너지는"] },
    ],
  },
  {
    id: 4,
    name: "price",
    label: "가격 파괴형",
    bgPrompt:
      "A clean, minimalist flat lay photograph of a warm latte in a ceramic cup on a light wooden table, soft natural light from the side, a small green leaf nearby, warm beige and cream color palette with subtle green accent, inviting and approachable aesthetic, no text, no people",
    ads: [
      { id: "A", headline: "심리상담 1회\n= 아메리카노 2잔", sub: "회당 2만원 · 한국상담학회 인증 수련기관", highlight: ["아메리카노 2잔"] },
      { id: "B", headline: "첫 상담 무료.\n부담 없이 시작하세요", sub: "2030 청년상담 · 회당 2만원", highlight: ["무료"] },
      { id: "C", headline: "10만원짜리 상담과\n같은 전문성, 2만원", sub: "교수급 슈퍼비전 · 첫 상담 무료", highlight: ["2만원"] },
    ],
  },
  {
    id: 5,
    name: "test",
    label: "심리검사 후킹형",
    bgPrompt:
      "A thoughtful overhead photograph of a journal open on a cozy desk with a pen, soft fairy lights in the background slightly blurred, warm amber and soft white tones, self-reflection and discovery mood, cozy editorial photography, no text, no people",
    ads: [
      { id: "A", headline: "MBTI 말고,\n진짜 나를 알려주는\n심리검사", sub: "전문가 해석 포함 · 첫 상담 무료", highlight: ["진짜 나를"] },
      { id: "B", headline: "나를 정확히\n알고 싶다면,\n심리검사부터", sub: "MMPI-2 · TCI 전문 검사", highlight: ["정확히"] },
      { id: "C", headline: "검사만 하고 끝?\n전문가가 직접\n해석해드립니다", sub: "2030 청년상담 · 회당 2만원", highlight: ["직접"] },
    ],
  },
];

// ── Gemini API 호출 ───────────────────────────────────
async function generateBackground(prompt, apiKey) {
  const url = `${API_BASE}/${MODEL}:generateContent?key=${apiKey}`;
  const body = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      responseModalities: ["IMAGE"],
      imageConfig: { aspectRatio: "1:1", imageSize: "1K" },
    },
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(120_000),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Gemini API error ${res.status}: ${errText}`);
  }

  const data = await res.json();
  const parts = data.candidates?.[0]?.content?.parts || [];
  const imgPart = parts.find((p) => p.inlineData);
  if (!imgPart) {
    throw new Error(`No image returned. Response: ${JSON.stringify(data).slice(0, 200)}`);
  }
  return Buffer.from(imgPart.inlineData.data, "base64");
}

// ── 텍스트 너비 측정 (글자 유형별 가중치) ─────────────
function measureTextWidth(text, fontSize) {
  let width = 0;
  for (const ch of text) {
    const code = ch.codePointAt(0);
    if (code >= 0xAC00 && code <= 0xD7AF) {
      // 한글 완성형 — full-width
      width += fontSize * 0.88;
    } else if (code >= 0x3000 && code <= 0x9FFF) {
      // CJK / 전각 기호
      width += fontSize * 0.88;
    } else if (ch === " ") {
      width += fontSize * 0.3;
    } else if (/[0-9]/.test(ch)) {
      width += fontSize * 0.55;
    } else if (/[A-Z]/.test(ch)) {
      width += fontSize * 0.65;
    } else if (/[a-z]/.test(ch)) {
      width += fontSize * 0.5;
    } else {
      // 특수문자 (·, ., - 등)
      width += fontSize * 0.35;
    }
  }
  return Math.ceil(width);
}

// ── SVG 텍스트 오버레이 생성 (v2: 좌측정렬, 큰 폰트, 포인트 컬러) ──
function createTextOverlay(headline, sub, highlightWords = []) {
  const lines = headline.split("\n");
  const PADDING_LEFT = 80;
  const HEADLINE_FONT_SIZE = 110;
  const HEADLINE_LINE_HEIGHT = 136;
  const SUB_FONT_SIZE = 48;
  const HEADLINE_START_Y = 320;

  // 메인 카피 각 줄을 만들면서, 강조 단어에 포인트 컬러 적용
  const headlineLines = lines.map((line, i) => {
    const y = HEADLINE_START_Y + i * HEADLINE_LINE_HEIGHT;
    let processedLine = escapeXml(line);

    // 강조 단어 치환
    for (const word of highlightWords) {
      const escaped = escapeXml(word);
      if (processedLine.includes(escaped)) {
        processedLine = processedLine.replace(
          escaped,
          `<tspan fill="${ACCENT_COLOR}">${escaped}</tspan>`
        );
      }
    }

    return `<text
      x="${PADDING_LEFT}" y="${y}"
      text-anchor="start"
      font-family="ChangwonDangamRound, 창원단감둥근, sans-serif"
      font-size="${HEADLINE_FONT_SIZE}"
      font-weight="400"
      fill="white"
    >${processedLine}</text>`;
  });

  // 서브텍스트 위치 (카피 아래 여백)
  const subY = HEADLINE_START_Y + lines.length * HEADLINE_LINE_HEIGHT + 50;
  const SUB_PAD = 24; // 사방 동일 여백
  const subTextWidth = measureTextWidth(sub, SUB_FONT_SIZE) + SUB_PAD * 2;
  const subBoxHeight = SUB_FONT_SIZE + SUB_PAD * 2;

  // 서브텍스트 + 흰색 배경 + 검정 텍스트
  const subBoxY = subY - SUB_FONT_SIZE - SUB_PAD + 10;
  const subElement = `
    <rect
      x="${PADDING_LEFT}" y="${subBoxY}"
      width="${subTextWidth}" height="${subBoxHeight}"
      rx="10" ry="10"
      fill="rgba(255,255,255,0.92)"
    />
    <text
      x="${PADDING_LEFT + SUB_PAD}" y="${subBoxY + SUB_PAD + SUB_FONT_SIZE * 0.78}"
      text-anchor="start"
      font-family="Pretendard, -apple-system, sans-serif"
      font-size="${SUB_FONT_SIZE}"
      font-weight="600"
      fill="#1a1a1a"
    >${escapeXml(sub)}</text>
  `;

  return Buffer.from(`
    <svg width="${SIZE}" height="${SIZE}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- 좌측 상단을 더 진하게 하는 그라데이션 -->
        <linearGradient id="overlay-top" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="rgba(0,0,0,0.55)" />
          <stop offset="60%" stop-color="rgba(0,0,0,0.25)" />
          <stop offset="100%" stop-color="rgba(0,0,0,0.1)" />
        </linearGradient>
        <linearGradient id="overlay-bottom" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="rgba(0,0,0,0)" />
          <stop offset="70%" stop-color="rgba(0,0,0,0)" />
          <stop offset="100%" stop-color="rgba(0,0,0,0.5)" />
        </linearGradient>
        <!-- 텍스트 그림자 필터 -->
        <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
          <feDropShadow dx="0" dy="3" stdDeviation="6" flood-color="rgba(0,0,0,0.6)" />
        </filter>
      </defs>

      <!-- 상단 그라데이션 (텍스트 가독성) -->
      <rect width="${SIZE}" height="${SIZE}" fill="url(#overlay-top)" />
      <!-- 하단 그라데이션 (로고 영역) -->
      <rect width="${SIZE}" height="${SIZE}" fill="url(#overlay-bottom)" />

      <!-- 메인 카피 (ChangwonDangamRound, 좌측 정렬, 큰 폰트) -->
      <g filter="url(#shadow)">
        ${headlineLines.join("\n        ")}
      </g>

      <!-- 서브텍스트 (반투명 배경 + Pretendard) -->
      ${subElement}
    </svg>
  `);
}

function escapeXml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// ── 로고 이미지 준비 ─────────────────────────────────
async function prepareLogoBuffer() {
  if (!fs.existsSync(LOGO_PATH)) {
    console.warn("⚠️  로고 파일 없음:", LOGO_PATH);
    return null;
  }
  // 로고를 적절한 크기로 리사이즈 (높이 120px — 모바일에서도 잘 보이도록)
  // 텍스트 로고가 검정이므로 흰색으로 반전
  return sharp(LOGO_PATH)
    .resize({ height: 120, withoutEnlargement: false })
    .negate({ alpha: false })
    .png()
    .toBuffer();
}

// ── 메인 실행 ─────────────────────────────────────────
async function main() {
  const args = process.argv.slice(2);
  const setFilter = args.includes("--set") ? parseInt(args[args.indexOf("--set") + 1]) : null;
  const adFilter = args.includes("--ad") ? args[args.indexOf("--ad") + 1].toUpperCase() : null;
  const compositeOnly = args.includes("--composite-only");

  const apiKey = loadApiKey();
  const logoBuffer = await prepareLogoBuffer();

  // 디렉토리 생성
  fs.mkdirSync(BG_DIR, { recursive: true });

  const sets = setFilter ? AD_SETS.filter((s) => s.id === setFilter) : AD_SETS;

  console.log(`\n🎨 광고 소재 이미지 생성 시작`);
  console.log(`   세트: ${sets.map((s) => `${s.id}(${s.label})`).join(", ")}`);
  console.log(`   출력: ${OUTPUT_DIR}\n`);

  for (const set of sets) {
    const bgPath = path.join(BG_DIR, `set${set.id}_${set.name}_bg.png`);

    // 1. 배경 이미지 생성 (세트당 1개)
    if (!compositeOnly) {
      if (fs.existsSync(bgPath)) {
        console.log(`⏭️  Set ${set.id} 배경 이미지 이미 존재 — 건너뜀`);
      } else {
        console.log(`🖼️  Set ${set.id} (${set.label}) 배경 이미지 생성 중...`);
        try {
          const imgBuffer = await generateBackground(set.bgPrompt, apiKey);
          await sharp(imgBuffer).resize(SIZE, SIZE, { fit: "cover" }).png().toFile(bgPath);
          console.log(`   ✅ 저장: ${path.basename(bgPath)}`);
        } catch (err) {
          console.error(`   ❌ 실패: ${err.message}`);
          continue;
        }
      }
    }

    if (!fs.existsSync(bgPath)) {
      console.error(`   ❌ 배경 이미지 없음: ${bgPath} — --composite-only 전에 배경을 먼저 생성하세요`);
      continue;
    }

    // 2. 소재별 텍스트 합성
    const ads = adFilter ? set.ads.filter((a) => a.id === adFilter) : set.ads;

    for (const ad of ads) {
      const outName = `set${set.id}_${set.name}_${ad.id.toLowerCase()}.png`;
      const outPath = path.join(OUTPUT_DIR, outName);

      console.log(`   📝 소재 ${set.id}-${ad.id}: "${ad.headline.split("\n")[0]}..."`);

      try {
        const overlay = createTextOverlay(ad.headline, ad.sub, ad.highlight || []);

        const composites = [{ input: overlay, top: 0, left: 0 }];

        // 로고 합성 (하단 중앙)
        if (logoBuffer) {
          const logoMeta = await sharp(logoBuffer).metadata();
          const logoLeft = Math.round((SIZE - logoMeta.width) / 2);
          composites.push({ input: logoBuffer, top: SIZE - 160, left: logoLeft });
        }

        await sharp(bgPath).composite(composites).png().toFile(outPath);
        console.log(`      ✅ ${outName}`);
      } catch (err) {
        console.error(`      ❌ 합성 실패: ${err.message}`);
      }
    }
  }

  // 결과 요약
  const finals = fs.readdirSync(OUTPUT_DIR).filter((f) => f.endsWith(".png") && !f.includes("_bg"));
  console.log(`\n✨ 완료! 총 ${finals.length}개 광고 소재 생성됨`);
  console.log(`   📂 ${OUTPUT_DIR}\n`);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
