import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const SLACK_WEBHOOK_URL = Deno.env.get("SLACK_WEBHOOK_URL")!;
const GOOGLE_SHEETS_WEBHOOK_URL = Deno.env.get("GOOGLE_SHEETS_WEBHOOK_URL")!;

interface YouthConsultation {
  id: string;
  name: string;
  phone: string;
  birth_year: string;
  gender: string;
  consultation_type: string;
  preferred_region: string | null;
  available_days: string[];
  available_times: string[];
  concerns: string[];
  additional_description: string | null;
  has_suicidal_risk: boolean;
  has_psychiatric_treatment: boolean;
  status: string;
  created_at: string;
}

Deno.serve(async (req) => {
  const payload = await req.json();
  const record: YouthConsultation = payload.record;

  const created = new Date(record.created_at).toLocaleString("ko-KR", {
    timeZone: "Asia/Seoul",
  });
  const concerns = (record.concerns || []).join(", ");
  const days = (record.available_days || []).join(", ");
  const times = (record.available_times || []).join(", ");

  const alerts: string[] = [];
  if (record.has_suicidal_risk) alerts.push(":warning: 자살 위기 체크됨");
  if (record.has_psychiatric_treatment) alerts.push(":hospital: 정신과 치료 중");

  const slackMessage = {
    text: "새로운 2030 청년상담 신청이 도착했습니다! :star2:",
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: [
            `*새로운 2030 청년상담 신청! :star2:*`,
            ``,
            `*기본 정보*`,
            `- 이름: ${record.name}`,
            `- 연락처: ${record.phone}`,
            `- 출생연도: ${record.birth_year}`,
            `- 성별: ${record.gender}`,
            ``,
            `*상담 희망*`,
            `- 고민: ${concerns}`,
            record.additional_description ? `- 부가 설명: ${record.additional_description}` : null,
            `- 상담 방식: ${record.consultation_type}`,
            record.preferred_region ? `- 희망 지역: ${record.preferred_region}` : null,
            `- 가능 요일: ${days}`,
            `- 가능 시간: ${times}`,
            ``,
            ...(alerts.length > 0 ? [`*:rotating_light: 스크리닝 주의*`, ...alerts, ``] : []),
            `_접수시간: ${created}_`,
          ]
            .filter(Boolean)
            .join("\n"),
        },
      },
    ],
  };

  const [slackResult, sheetsResult] = await Promise.allSettled([
    fetch(SLACK_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(slackMessage),
    }),
    fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: record.id,
        name: record.name,
        phone: record.phone,
        birth_year: record.birth_year,
        gender: record.gender,
        consultation_type: record.consultation_type,
        preferred_region: record.preferred_region,
        available_days: record.available_days,
        available_times: record.available_times,
        concerns: record.concerns,
        additional_description: record.additional_description,
        has_suicidal_risk: record.has_suicidal_risk,
        has_psychiatric_treatment: record.has_psychiatric_treatment,
        status: record.status,
        created_at: record.created_at,
      }),
    }),
  ]);

  const errors: string[] = [];
  if (slackResult.status === "rejected") {
    errors.push(`Slack: ${slackResult.reason}`);
  }
  if (sheetsResult.status === "rejected") {
    errors.push(`Sheets: ${sheetsResult.reason}`);
  }

  if (errors.length > 0) {
    console.error("Notification errors:", errors);
  }

  return new Response(JSON.stringify({ success: true, errors }), {
    headers: { "Content-Type": "application/json" },
  });
});
