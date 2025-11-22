# EmailJS Setup Guide

To make the contact form work, you need to set up a free account on EmailJS and get your API keys. Follow these steps:

## 1. Create an Account
1. Go to [EmailJS](https://www.emailjs.com/) and sign up for a free account.

## 2. Add an Email Service
1. In your EmailJS dashboard, go to the **Email Services** tab.
2. Click **Add New Service**.
3. Select your email provider (e.g., Gmail).
4. Click **Connect Account** and follow the prompts.
5. Click **Create Service**.
6. **Copy the Service ID** (e.g., `service_xxxxxxx`). You will need this later.

## 3. Create an Email Template
1. Go to the **Email Templates** tab.
2. Click **Create New Template**.
3. Design your email template. You can use the following variables which match your form fields:
   - `{{name}}`: The sender's name
   - `{{email}}`: The sender's email
   - `{{phone}}`: The sender's phone number
   - `{{reason}}`: The reason for hiring
   - `{{projectDetails}}`: The project details
   
   **Example Subject:** `New Portfolio Inquiry from {{name}}`
   
   **Example Content:**
   ```
   Name: {{name}}
   Email: {{email}}
   Phone: {{phone}}
   
   Reason: {{reason}}
   
   Project Details:
   {{projectDetails}}
   ```
4. Click **Save**.
5. **Copy the Template ID** (e.g., `template_xxxxxxx`).

## 4. Get Your Public Key
1. Go to the **Account** tab (click your name in the top right corner).
2. **Copy the Public Key** (e.g., `user_xxxxxxx` or a long random string).

## 5. Update Your Code
Open `app/contact/page.tsx` and replace the placeholders with your actual keys:

```typescript
const SERVICE_ID = 'YOUR_SERVICE_ID'; // Replace with your Service ID
const TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // Replace with your Template ID
const PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // Replace with your Public Key
```

> [!IMPORTANT]
> For better security, you should eventually move these keys to environment variables (`.env.local`), but putting them directly in the file is fine for getting started.
