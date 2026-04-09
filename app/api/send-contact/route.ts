export const runtime = 'nodejs';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    await resend.emails.send({
      from: 'Lova Le <onboarding@resend.dev>',
      to: ['zorguimohamedsalah@gmail.com'],
      subject: `رسالة جديدة من ${name}`,
      html: `<h2>📩 رسالة تواصل</h2>
             <p><strong>الاسم:</strong> ${name}</p>
             <p><strong>البريد:</strong> ${email}</p>
             <p><strong>الرسالة:</strong> ${message}</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
