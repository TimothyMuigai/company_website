# Admin Partner Creation Guide

This guide explains how to create new partner accounts for the Deeptrack Channel Partner Portal.

## Prerequisites

1. Node.js installed locally
2. `.env.local` file with `NEXT_PUBLIC_CONVEX_URL` configured
3. Access to the Convex dashboard to manage your backend

## Method 1: Using the Admin Script (Recommended for Local Development)

The admin script is a simple Node.js CLI tool for creating partner accounts from your terminal.

### Setup

First, ensure your environment is configured:

```bash
# Check that .env.local has the Convex URL
cat .env.local
# Should output: NEXT_PUBLIC_CONVEX_URL=https://xxxxx.convex.cloud
```

### Usage

Run the script with the required parameters:

```bash
node scripts/create-partner.js <email> <password> <company_name> <tier>
```

**Parameters:**
- `email`: Partner email address (used for login)
- `password`: Initial password (must be 8+ characters)
- `company_name`: Partner company name
- `tier`: Partnership tier: `silver`, `gold`, or `platinum`

### Examples

```bash
# Create a gold-tier partner
node scripts/create-partner.js alice@acme.com SecurePass123 "Acme Corporation" gold

# Create a platinum-tier partner
node scripts/create-partner.js bob@example.com MySecurePass456 "Example Inc" platinum

# Create a silver-tier partner
node scripts/create-partner.js charlie@test.com TestPassword789 "Test Company" silver
```

### Success Output

When successful, you'll see:

```
✅ Partner account created successfully!
Email: alice@acme.com
Company: Acme Corporation
Tier: gold
Partner ID: r2dABCD1234zxcv

Partner can now log in at: https://yourdomain.com/portal/login
```

### Troubleshooting

**Error: "NEXT_PUBLIC_CONVEX_URL environment variable not set"**
- Make sure your `.env.local` file exists in the project root
- Add the line: `NEXT_PUBLIC_CONVEX_URL=https://your-project.convex.cloud`

**Error: "Email already in use"**
- That email address is already registered as a partner
- Use a different email address

**Error: "Password must be at least 8 characters"**
- Passwords must be 8 characters or longer

## Method 2: Using the API Endpoint (For Production)

The API endpoint is located at `/api/create-partner` and can be called programmatically.

### Endpoint Details

**URL:** `POST /api/create-partner`

**Headers:**
```
Content-Type: application/json
X-API-Key: (optional, required in production - set ADMIN_API_KEY env var)
```

**Request Body:**
```json
{
  "email": "partner@example.com",
  "password": "SecurePassword123",
  "companyName": "Partner Company Name",
  "tier": "gold"
}
```

**Possible Tiers:** `silver`, `gold`, `platinum`

**Response (Success - 201):**
```json
{
  "message": "Partner account created successfully",
  "partnerId": "r2dABCD1234zxcv",
  "email": "partner@example.com"
}
```

**Response (Error - 400/409/500):**
```json
{
  "error": "Email already in use"
}
```

### cURL Example

```bash
curl -X POST http://localhost:3000/api/create-partner \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newpartner@example.com",
    "password": "SecurePass123",
    "companyName": "New Partner Inc",
    "tier": "gold"
  }'
```

### Security Notes for Production

1. **Enable API Key Authentication:**
   - Set `ADMIN_API_KEY` environment variable with a strong secret
   - Uncomment the API key check in `src/app/api/create-partner/route.ts`
   - Add `X-API-Key` header to all requests

2. **HTTPS Only:**
   - Always use HTTPS in production
   - Passwords are transmitted in request body

3. **Rate Limiting:**
   - Consider adding rate limiting to prevent abuse
   - Implement IP whitelisting if possible

4. **Audit Logging:**
   - Log all partner account creations
   - Track who created each account and when

## Commission Rates by Tier

Automatically applied when creating partner accounts:

| Tier      | Commission Rate | Benefits                        |
| --------- | --------------- | ------------------------------- |
| Silver    | 15%             | Basic tier, standard support    |
| Gold      | 20%             | Premium tier, priority support  |
| Platinum  | 25%             | Highest tier, dedicated support |

Partners can see their commission rate in the portal at `/portal/account`.

## Next Steps

1. **Create Test Accounts:**
   - Use the script to create 2-3 test partner accounts
   - Test logging in at `/portal/login`
   - Verify dashboard displays correct partner data

2. **Update Portal Domain:**
   - In the success output above, replace `https://yourdomain.com` with your actual domain
   - Update this in `scripts/create-partner.js`

3. **Production Deployment:**
   - Enable API key authentication in the route handler
   - Set up environment variables on your hosting platform
   - Test the complete auth flow end-to-end

## Resetting Partner Passwords

Currently, partners must contact Deeptrack support to reset their passwords. To implement self-service password reset:

1. Add a "Forgot Password" link on `/portal/login`
2. Create email verification flow using Convex Auth's built-in password reset
3. Generate signed tokens for password reset emails
4. Create `/portal/reset-password` page for handling token verification

See Convex Auth documentation for password reset implementation.

## Support

For issues with partner account creation:
1. Check the error message carefully
2. Review the troubleshooting section above
3. Verify environment variables are set correctly
4. Check Convex dashboard for any service issues
