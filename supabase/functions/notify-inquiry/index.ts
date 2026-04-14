import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const SLACK_WEBHOOK_URL = Deno.env.get("SLACK_WEBHOOK_URL")!;
const GOOGLE_SHEETS_WEBHOOK_URL = Deno.env.get("GOOGLE_SHEETS_WEBHOOK_URL")!;

interface ContactInquiry {
  id: string;
  name: string;
  phone: string;
  birth_date: string;
  counseling_type: string;
  counseling_method: string;
  preferred_days: string[];
  message: string;
  status: string;
  created_at: string;
}

Deno.serve(async (req) => {
  const payload = await req.json();
  const record: ContactInquiry = payload.record;

  const created = new Date(record.created_at).toLocaleString("ko-KR", {
    timeZone: "Asia/Seoul",
  });
  const days = (record.preferred_days || []).join(", ");

  const slackMessage = {
    text: "새로운 상담 문의가 도착했습니다! :bell:",
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: [
            `*새로운 상담 문의가 도착했습니다! :bell:*`,
            ``,
            `- 이름: ${record.name}`,
            `- 연락처: ${record.phone}`,
            `- 생년월일: ${record.birth_date}`,
            ``,
            `- 상담 유형: ${record.counseling_type}`,
            `- 상담 방식: ${record.counseling_method}`,
            `- 희망 요일: ${days}`,
            ``,
            `- 문의 내용: ${record.message}`,
            ``,
            `_접수시간: ${created}_`,
          ].join("\n"),
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
        birth_date: record.birth_date,
        counseling_type: record.counseling_type,
        counseling_method: record.counseling_method,
        preferred_days: record.preferred_days,
        message: record.message,
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
