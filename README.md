# Veritas Autos Marketplace

A Vercel-ready Next.js marketplace foundation for Veritas Autos. It includes the marketing website, public catalogue, customer and vendor registration, vendor product submissions, admin product approval, Paystack checkout/webhook verification, commission accounting, vendor wallets and withdrawal requests, admin/customer support chat, and complaint tickets.

## Important operating rules implemented

- Vendors can create listings, but listings stay `PENDING` until an admin approves them.
- Customers and vendors do **not** get direct messaging with one another. Customer/vendor support conversations are visible to the user and the Veritas Autos admin team only.
- Customers can raise tickets and reply in their own tickets. Admins can view all tickets.
- Checkout totals and commission amounts are calculated on the server. The frontend is not trusted for payment confirmation.
- A signed Paystack webhook verifies successful payments before the order is marked paid, inventory is reduced, and vendor proceeds are recorded as pending.
- Vendor net proceeds are held as pending until an admin marks the vendor order delivered. Delivery release moves net proceeds into the available wallet balance.
- Withdrawal requests are deducted from available balance and queued for admin review. Rejected requests are returned to the vendor wallet.
- Marketplace commission is recorded separately in `PlatformLedger` for admin reconciliation.

## Stack

- Next.js App Router + TypeScript
- MySQL through Prisma (no Supabase dependency)
- HTTP-only signed session cookie with bcrypt password hashing
- Paystack checkout and webhook verification
- Vercel deployment through GitHub

## Deploy to Vercel through GitHub

1. Download and extract this project ZIP.
2. Create a new private GitHub repository, for example `veritas-autos-marketplace`.
3. Upload the **contents** of the extracted project folder to the repository root. `package.json` and `prisma/` must be at the root, not inside another nested project folder.
4. In Vercel, choose **Add New → Project**, import the GitHub repository, and keep the framework preset as Next.js.
5. Create a production MySQL database that is reachable from Vercel. Add its connection string as `DATABASE_URL` in Vercel Project Settings → Environment Variables. Use a managed MySQL service during the Vercel phase. Do not use a local database file.
6. Add `AUTH_SECRET` as a long random secret, `APP_URL` as the deployed HTTPS URL, `PAYSTACK_SECRET_KEY`, `PAYSTACK_PUBLIC_KEY`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `DEFAULT_COMMISSION_PERCENT` and `MIN_WITHDRAWAL_NGN`.
7. Deploy once to build the application. Then run the database schema and seed commands from a local terminal with the same production `DATABASE_URL` in a protected local `.env` file:

   ```bash
   npm install
   npx prisma generate
   npx prisma db push
   npm run db:seed
   ```

   Alternatively, run `npx prisma db push` and `npm run db:seed` from a secure one-off environment with the production variables. Never commit `.env`.

8. In Paystack Dashboard, set the webhook URL to `https://YOUR-DOMAIN/api/payments/webhook`. Start with Paystack test keys, test payment success/failure, then switch to live keys after validation.
9. Redeploy after setting the production environment variables.

### Admin login

The seed script creates the account specified by `ADMIN_EMAIL` and `ADMIN_PASSWORD`. Set both values before running the seed. Do not use the example password in production. Registration deliberately does not offer public admin signup.

### Vendor workflow

1. Vendor registers as a retailer or wholesaler.
2. Vendor submits a listing in `/vendor`.
3. Admin approves it in `/admin` before it appears in `/shop`.
4. Customer checks out through Paystack.
5. The signed webhook records vendor net proceeds as pending and records the marketplace commission separately.
6. Admin manages fulfillment. Marking a vendor order delivered releases its net proceeds to available balance. Withdrawal requests can then be reviewed by finance/admin.

### Support workflow

- `/chat`: customer or vendor opens a private support conversation. Admins can view and answer support conversations.
- `/tickets`: customers and vendors can raise tickets, see their own tickets and send replies. Admins can view all tickets. Ticket status changes can be managed through `PATCH /api/admin/tickets`.

## Before accepting live money

This is a deployable foundation, not a substitute for a production acceptance test. Test the entire flow in Paystack test mode. In particular, verify your MySQL provider supports the chosen connection limits, configure backups and monitoring, check all payment edge cases, and have finance confirm your commission, refunds, delivery and withdrawal policy. Add an audited admin fulfillment screen and proper email notifications before a public launch. Product image upload is currently URL based; add object storage (for example S3-compatible storage) before allowing large vendor uploads.

## Future move to conventional hosting

The app currently uses Next.js server routes and MySQL. Vercel deployment is the first hosting stage. A move to conventional cPanel hosting will require a hosting plan that supports the Next.js Node runtime; standard static-only shared hosting will not run the server APIs. If the final host is PHP-only shared hosting, port the API to Laravel while keeping the MySQL data model and frontend design. Keep all payment and authentication secrets in environment variables, never in Git.
