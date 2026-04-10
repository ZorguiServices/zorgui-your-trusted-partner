const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const GATEWAY_URL = 'https://connector-gateway.lovable.dev/resend';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!RESEND_API_KEY || !LOVABLE_API_KEY) {
      throw new Error('Missing API keys');
    }

    const { type, name, phone, email, service, message, date, time, attachmentUrls } = await req.json();

    // Build email HTML
    let subject = '';
    let html = '';

    if (type === 'contact') {
      subject = `📩 طلب تواصل جديد من ${name}`;
      html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; direction: rtl;">
          <div style="background: #1B2A4A; padding: 20px; border-radius: 8px 8px 0 0;">
            <h1 style="color: #D4AF37; margin: 0; font-size: 22px;">📩 طلب تواصل جديد</h1>
          </div>
          <div style="background: #f9f9f9; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e0e0e0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 10px; font-weight: bold; color: #1B2A4A;">الاسم:</td><td style="padding: 10px;">${name || '-'}</td></tr>
              <tr style="background: #fff;"><td style="padding: 10px; font-weight: bold; color: #1B2A4A;">الهاتف:</td><td style="padding: 10px;">${phone || '-'}</td></tr>
              <tr><td style="padding: 10px; font-weight: bold; color: #1B2A4A;">البريد:</td><td style="padding: 10px;">${email || '-'}</td></tr>
              <tr style="background: #fff;"><td style="padding: 10px; font-weight: bold; color: #1B2A4A;">الخدمة:</td><td style="padding: 10px;">${service || '-'}</td></tr>
              <tr><td style="padding: 10px; font-weight: bold; color: #1B2A4A;">الرسالة:</td><td style="padding: 10px;">${message || '-'}</td></tr>
            </table>
            ${attachmentUrls?.length ? `
              <div style="margin-top: 16px; padding: 12px; background: #fff; border-radius: 6px;">
                <p style="font-weight: bold; color: #1B2A4A; margin: 0 0 8px;">📎 المرفقات:</p>
                ${attachmentUrls.map((url: string, i: number) => `<p style="margin: 4px 0;"><a href="${url}" style="color: #D4AF37;">ملف ${i + 1}</a></p>`).join('')}
              </div>
            ` : ''}
          </div>
        </div>
      `;
    } else if (type === 'booking') {
      subject = `📅 حجز موعد جديد من ${name}`;
      html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; direction: rtl;">
          <div style="background: #1B2A4A; padding: 20px; border-radius: 8px 8px 0 0;">
            <h1 style="color: #D4AF37; margin: 0; font-size: 22px;">📅 حجز موعد جديد</h1>
          </div>
          <div style="background: #f9f9f9; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e0e0e0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 10px; font-weight: bold; color: #1B2A4A;">الاسم:</td><td style="padding: 10px;">${name || '-'}</td></tr>
              <tr style="background: #fff;"><td style="padding: 10px; font-weight: bold; color: #1B2A4A;">الهاتف:</td><td style="padding: 10px;">${phone || '-'}</td></tr>
              <tr><td style="padding: 10px; font-weight: bold; color: #1B2A4A;">البريد:</td><td style="padding: 10px;">${email || '-'}</td></tr>
              <tr style="background: #fff;"><td style="padding: 10px; font-weight: bold; color: #1B2A4A;">التاريخ:</td><td style="padding: 10px;">${date || '-'}</td></tr>
              <tr><td style="padding: 10px; font-weight: bold; color: #1B2A4A;">الوقت:</td><td style="padding: 10px;">${time || '-'}</td></tr>
              <tr style="background: #fff;"><td style="padding: 10px; font-weight: bold; color: #1B2A4A;">الخدمة:</td><td style="padding: 10px;">${service || '-'}</td></tr>
            </table>
            ${attachmentUrls?.length ? `
              <div style="margin-top: 16px; padding: 12px; background: #fff; border-radius: 6px;">
                <p style="font-weight: bold; color: #1B2A4A; margin: 0 0 8px;">📎 المرفقات:</p>
                ${attachmentUrls.map((url: string, i: number) => `<p style="margin: 4px 0;"><a href="${url}" style="color: #D4AF37;">ملف ${i + 1}</a></p>`).join('')}
              </div>
            ` : ''}
          </div>
        </div>
      `;
    } else {
      return new Response(JSON.stringify({ error: 'Invalid type' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const resendResponse = await fetch(`${GATEWAY_URL}/emails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'X-Connection-Api-Key': RESEND_API_KEY,
      },
      body: JSON.stringify({
        from: 'Zorgui Services <onboarding@resend.dev>',
        to: ['zorguimohamedsalah@gmail.com'],
        subject,
        html,
      }),
    });

    const result = await resendResponse.json();

    if (!resendResponse.ok) {
      console.error('Resend error:', result);
      return new Response(JSON.stringify({ error: 'Failed to send email', details: result }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true, id: result.id }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
