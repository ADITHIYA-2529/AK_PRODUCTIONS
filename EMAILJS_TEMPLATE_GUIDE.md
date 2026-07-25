# ✉️ EmailJS Template Copies for AK Events / AK Productions

Copy and paste these exact HTML templates into your **[EmailJS Dashboard](https://dashboard.emailjs.com/admin/templates)** under **Email Templates** -> **Create New Template** (or Edit existing template).

---

## 1. Contact Form Template (`VITE_EMAILJS_CONTACT_TEMPLATE_ID`)

### Template Details in EmailJS:
- **Template Name:** `AK Events - Contact Form`
- **Subject Line:** `New Contact Enquiry: {{subject}} from {{from_name}}`
- **To Email:** `akeventschennai@gmail.com` *(or your preferred admin email)*
- **Reply-To:** `{{reply_to}}`

### Content (Switch to HTML Mode in EmailJS and paste this code):

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f4f7; margin: 0; padding: 20px; color: #1f2937; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e5e7eb; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .header { background: #0f172a; color: #ffffff; padding: 28px; text-align: center; border-bottom: 3px solid #c8a24a; }
    .header h1 { margin: 0; font-size: 22px; letter-spacing: 2px; color: #c8a24a; text-transform: uppercase; }
    .header p { margin: 6px 0 0 0; font-size: 12px; color: #94a3b8; letter-spacing: 1px; }
    .content { padding: 30px; }
    .row { margin-bottom: 16px; border-bottom: 1px dashed #f1f5f9; padding-bottom: 12px; }
    .label { font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #64748b; font-weight: bold; }
    .value { font-size: 15px; color: #0f172a; font-weight: 600; margin-top: 4px; }
    .message-box { background: #f8fafc; border-left: 4px solid #c8a24a; padding: 16px; border-radius: 6px; margin-top: 10px; font-size: 14px; line-height: 1.6; color: #334155; }
    .footer { background: #f8fafc; padding: 16px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #f1f5f9; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>AK PRODUCTIONS</h1>
      <p>NEW WEBSITE CONTACT ENQUIRY</p>
    </div>
    <div class="content">
      <div class="row">
        <div class="label">Client Name</div>
        <div class="value">{{from_name}}</div>
      </div>
      <div class="row">
        <div class="label">Email Address</div>
        <div class="value"><a href="mailto:{{user_email}}" style="color: #c8a24a; text-decoration: none;">{{user_email}}</a></div>
      </div>
      <div class="row">
        <div class="label">Phone / WhatsApp</div>
        <div class="value"><a href="tel:{{user_phone}}" style="color: #0f172a; text-decoration: none;">{{user_phone}}</a></div>
      </div>
      <div class="row">
        <div class="label">Subject</div>
        <div class="value">{{subject}}</div>
      </div>
      <div style="margin-top: 20px;">
        <div class="label">Message</div>
        <div class="message-box">{{message}}</div>
      </div>
    </div>
    <div class="footer">
      Received via AK Events Contact Form at {{submitted_at}}
    </div>
  </div>
</body>
</html>
```

---

## 2. Event Booking Form Template (`VITE_EMAILJS_BOOKING_TEMPLATE_ID`)

### Template Details in EmailJS:
- **Template Name:** `AK Events - Event Booking`
- **Subject Line:** `🎉 NEW EVENT BOOKING: {{event_type}} by {{from_name}}`
- **To Email:** `akeventschennai@gmail.com`
- **Reply-To:** `{{reply_to}}`

### Content (Switch to HTML Mode in EmailJS and paste this code):

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f4f7; margin: 0; padding: 20px; color: #1f2937; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e5e7eb; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .header { background: #0f172a; color: #ffffff; padding: 28px; text-align: center; border-bottom: 3px solid #c8a24a; }
    .header h1 { margin: 0; font-size: 22px; letter-spacing: 2px; color: #c8a24a; text-transform: uppercase; }
    .header p { margin: 6px 0 0 0; font-size: 12px; color: #94a3b8; letter-spacing: 1px; }
    .content { padding: 30px; }
    .section-title { font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; color: #c8a24a; margin-bottom: 14px; margin-top: 20px; border-bottom: 1px solid #f1f5f9; padding-bottom: 6px; }
    .grid { display: table; width: 100%; table-layout: fixed; }
    .grid-col { display: table-cell; width: 50%; vertical-align: top; padding-bottom: 14px; }
    .label { font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: #64748b; font-weight: bold; }
    .value { font-size: 14px; color: #0f172a; font-weight: 600; margin-top: 3px; }
    .highlight { color: #c8a24a; font-weight: 700; }
    .message-box { background: #f8fafc; border-left: 4px solid #c8a24a; padding: 16px; border-radius: 6px; margin-top: 8px; font-size: 14px; line-height: 1.6; color: #334155; }
    .footer { background: #f8fafc; padding: 16px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #f1f5f9; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>AK PRODUCTIONS</h1>
      <p>NEW EVENT BOOKING REQUEST</p>
    </div>
    <div class="content">
      
      <div class="section-title">👤 Client Contact Information</div>
      <div class="grid">
        <div class="grid-col">
          <div class="label">Client Name</div>
          <div class="value">{{from_name}}</div>
        </div>
        <div class="grid-col">
          <div class="label">Mobile Number</div>
          <div class="value"><a href="tel:{{user_phone}}" style="color: #0f172a; text-decoration: none;">{{user_phone}}</a></div>
        </div>
      </div>
      <div style="margin-bottom: 14px;">
        <div class="label">Email Address</div>
        <div class="value"><a href="mailto:{{user_email}}" style="color: #c8a24a; text-decoration: none;">{{user_email}}</a></div>
      </div>

      <div class="section-title">📅 Event Overview</div>
      <div class="grid">
        <div class="grid-col">
          <div class="label">Event Type</div>
          <div class="value highlight">{{event_type}}</div>
        </div>
        <div class="grid-col">
          <div class="label">Event Date</div>
          <div class="value">{{event_date}}</div>
        </div>
      </div>
      <div class="grid">
        <div class="grid-col">
          <div class="label">Estimated Guests</div>
          <div class="value">{{guests_count}} Guests</div>
        </div>
        <div class="grid-col">
          <div class="label">Budget Range</div>
          <div class="value highlight">{{budget_range}}</div>
        </div>
      </div>
      <div style="margin-bottom: 14px;">
        <div class="label">Venue / Location</div>
        <div class="value">{{venue_location}}</div>
      </div>

      <div class="section-title">📝 Special Requirements & Vision</div>
      <div class="message-box">{{requirements}}</div>

    </div>
    <div class="footer">
      Received via AK Events Online Booking at {{submitted_at}}
    </div>
  </div>
</body>
</html>
```

---

## 3. How to Get Your Template IDs & Public Key

1. Log into your [EmailJS Dashboard](https://dashboard.emailjs.com/).
2. **Service ID**: Found under **Email Services** (e.g., `service_bb6gbjh`).
3. **Contact Template ID**: Found in the top right of your Contact Template editor (starts with `template_...`).
4. **Booking Template ID**: Found in the top right of your Booking Template editor (starts with `template_...`).
5. **Public Key**: Found under **Account** → **API Keys** (e.g. `user_xyz123abc`).

Update `.env`:
```env
VITE_EMAILJS_SERVICE_ID="service_bb6gbjh"
VITE_EMAILJS_CONTACT_TEMPLATE_ID="template_xxxxxxx"
VITE_EMAILJS_BOOKING_TEMPLATE_ID="template_yyyyyyy"
VITE_EMAILJS_PUBLIC_KEY="your_public_key"
```
