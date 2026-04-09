export const runtime = 'nodejs';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, date, time, service, notes } = await request.json();

    await resend.emails.send({
      from: 'Lova Le <onboarding@resend.dev>',
      to: ['zorguimohamedsalah@gmail.com'],
      subject: `طلب حجز موعد - ${name}`,
      html: `<h2>📅 طلب حجز موعد جديد</h2>
             <p><strong>الاسم:</strong> ${name}</p>
             <p><strong>البريد:</strong> ${email}</p>
             <p><strong>التاريخ:</strong> ${date}</p>
             <p><strong>الوقت:</strong> ${time}</p>
             <p><strong>الخدمة:</strong> ${service || 'غير محدد'}</p>
             <p><strong>ملاحظات:</strong> ${notes || 'لا توجد'}</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
