# Veritas Autos Marketplace

A fresh Next.js marketplace foundation for Veritas Autos, built for GitHub → Vercel deployment and a MySQL database that can later move to conventional hosting. It intentionally removes Prisma and its schema generation lifecycle from the deployment path. Database structure is managed through one reviewed SQL file instead.

## Included

- Next.js App Router on the patched Next.js 16.3.8 release line, React 19, JavaScript modules and ESLint flat config.
- Responsive Veritas Autos marketplace landing page and category navigation for engine parts, oil and lubricants, braking, electrical, suspension and steering, body parts, accessories, tyres and rims, and commercial truck parts including HOWO, MACK and DAF.
- Customer and vendor account registration, password hashing with bcrypt, signed HTTP-only session cookies and role checks.
- MySQL 8 schema and seeded categories in `db/schema.sql`.
- Vendor product submission, admin approval/rejection, wholesale minimum order quantities, wallet balance and withdrawal requests.
- Private support conversations and ticket creation, replies and admin ticket status changes. Vendors and customers do not have a direct messaging route to one another.
- Paystack transaction initialization, signature validation, server-side transaction verification, payment idempotency and pending vendor proceeds.
- Admin workflow to approve or reject withdrawal requests, and release vendor proceeds after marking a paid order delivered.
- A health endpoint at `/api/health` that reports database and session configuration status.
- One-time browser-based first-admin setup at `/setup-admin`.

## Runtime requirements

- Node.js 22.x is recommended for Vercel.
- MySQL 8.0 or compatible managed MySQL with TLS access from Vercel.
- Paystack account for live checkout. Use test keys until checkout, webhook and settlement flows have been tested.
- The production app uses server routes and cookies, so deploy as a normal Next.js Vercel application, not as a static export.

## GitHub and Vercel setup (no local terminal required)

1. Download and extract the project ZIP.
2. Create or open your GitHub repository. Upload the **contents** of this folder so `package.json`, `app/`, `lib/`, and `db/` are at the repository root. Do not upload an extra nested folder around the app.
3. In Vercel, import that GitHub repository. Use the repository root as the Root Directory. Framework preset should be Next.js. Build command: `npm run build`. Output directory should remain the Vercel default.
4. Create a MySQL 8 database on a provider that permits connections from Vercel. Use its control panel or phpMyAdmin to run the complete `db/schema.sql` file once.
5. In Vercel → Project → Settings → Environment Variables, add:
   - `DATABASE_URL`: `mysql://USER:PASSWORD@HOST:3306/DATABASE?ssl=true` (URL encode special characters in username/password).
   - `SESSION_SECRET`: a randomly generated secret of at least 32 characters.
   - `APP_URL`: the full deployed HTTPS URL, with no trailing slash.
   - `ADMIN_BOOTSTRAP_TOKEN`: a separate random secret of at least 24 characters. Keep it private.
   - `PAYSTACK_SECRET_KEY`: Paystack test secret key during testing.
   - `PAYSTACK_PUBLIC_KEY`: Paystack test public key for future client-side checkout UI.
6. Deploy the project.
7. Visit `/api/health`. It should report `status: ready`, `database: connected`, and `session: true`. If it does not, fix the environment variables or database network access first.
8. Visit `/setup-admin`, enter the `ADMIN_BOOTSTRAP_TOKEN`, admin name, email and a strong password. This endpoint creates an admin only if no admin currently exists; it returns a conflict after the first admin has been created. Remove `ADMIN_BOOTSTRAP_TOKEN` from Vercel after setting up the account and redeploy.
9. In Paystack dashboard, set the webhook URL to `https://YOUR-DEPLOYED-DOMAIN/api/payments/webhook`. Continue using test keys until successful and failed payment cases have been verified.
10. Redeploy whenever you change Vercel environment variables.

## Important environment and security notes

- Never commit `.env` or production secrets to GitHub. Only `.env.example` is included.
- Do not set an admin role through public registration. Admin creation is only available through the one-time setup flow.
- Vendor accounts start unapproved. Admin approval is required before listings and withdrawals are enabled.
- The platform keeps vendor net proceeds in a pending balance after verified payment. The admin order workflow releases pending proceeds after marking an order delivered. Define your dispute/returns period and settlement policy before using live funds.
- The account number entered for a withdrawal is encrypted before being stored. For higher assurance, use a dedicated KMS managed encryption key instead of deriving the key from the application secret.
- Paystack webhook events are signed and payment status is checked against Paystack's verify endpoint. Never treat a browser redirect as proof of payment.
- The checkout API expects a list of product IDs and quantities plus shipping details. A customer-facing cart/checkout UI and full shipping integration should be completed and tested before accepting live orders.
- This repository does not yet include image upload storage, email/SMS delivery, shipping carrier integration, refunds automation, or automatic reconciliation/expiry of unpaid orders. Add these before scaling operations.

## Core routes

- `GET /api/health`
- `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/logout`
- `GET/POST /api/tickets`, `GET/POST /api/tickets/:id`
- `GET/POST /api/chat`
- `GET/POST /api/vendor/products`
- `GET/POST /api/vendor/withdrawals`, `GET /api/vendor/wallet`
- `GET /api/admin/withdrawals`, `PATCH /api/admin/withdrawals/:id`
- `PATCH /api/admin/products/:id`, `PATCH /api/admin/vendors/:id`, `PATCH /api/admin/orders/:id`, `PATCH /api/admin/tickets/:id`
- `POST /api/checkout`
- `POST /api/payments/webhook`

## Build and deployment validation

The project uses no Prisma, so Vercel does not run `prisma generate` during package installation. The earlier Prisma schema validation failure is removed from this architecture. The code has been checked for JavaScript syntax errors and its ZIP archive will be verified before delivery. A full Next.js production build requires downloading dependencies and a network connection; if the execution environment cannot reach npm, final build validation must run in Vercel's build environment.

## Technology references

- Next.js release notes: https://nextjs.org/blog
- Next.js deployment guide: https://nextjs.org/docs/app/getting-started/deploying
- Paystack API documentation: https://paystack.com/docs/api/
