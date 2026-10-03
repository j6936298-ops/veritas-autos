# Veritas Autos — React + Vercel demo

A responsive React/Vite starter based on the public Veritas Autos marketplace structure. It includes the public storefront, product browsing, sample seller profiles, role-based account experiences, demo cart/orders, seller listings, admin account review, and support ticket conversations.

## Run locally

Requirements: Node.js 20+ and npm.

```bash
npm install
npm run dev
```

Create a production build with `npm run build`. Deploy the project folder or Git repository to Vercel; `vercel.json` provides SPA routing.

## Demo sign-ins

| Role | Email | Password |
|---|---|---|
| Admin | `admin@veritasautos.demo` | `Admin123!` |
| Wholesaler | `wholesaler@veritasautos.demo` | `Demo123!` |
| Retailer | `retailer@veritasautos.demo` | `Demo123!` |
| Customer | `customer@veritasautos.demo` | `Demo123!` |

You can also create a new account. Wholesaler and retailer registrations start in `pending` status until an admin approves them.

## Important demo-mode limitations

- No database is connected. Users, tickets, listings, cart and orders are stored in the current browser's `localStorage`. They do not sync between users, devices, or browsers and can be cleared by clearing site data. This is for UI/workflow demonstrations only, not production authentication or secure data storage.
- Demo passwords are intentionally basic and must not be reused for real accounts. Before production, replace browser-only authentication with a trusted backend/auth provider and enforce role permissions on the server.
- Orders are demo records only; no payment is collected and Paystack is not connected.
- Demo product images are remote Unsplash images and require internet access.

## Email notifications for resolved support tickets

The Vercel serverless route `api/ticket-notification.js` sends a notification through Resend when an admin resolves a ticket. To enable actual delivery:

1. Create/verify a sending domain in Resend.
2. Add `RESEND_API_KEY` and `MAIL_FROM` in Vercel Project Settings → Environment Variables (see `.env.example`).
3. Redeploy the project.

Without these environment variables, the endpoint deliberately reports demo mode and no email is sent. Email delivery also requires a valid recipient email and the provider accepting the message.

## Suggested next production stage

Add a database and server-enforced authentication/authorization; model users, seller approvals, products, wholesale minimum quantities, carts/orders, tickets/messages, and email delivery logs. The current browser demo is not multi-user persistence and must not be treated as secure or production-ready.
