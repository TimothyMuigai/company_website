#!/usr/bin/env node

/**
 * Admin Script: Create Partner Account
 * 
 * Usage: node scripts/create-partner.js <email> <password> <company_name> <tier>
 * 
 * Example:
 * node scripts/create-partner.js partner@example.com SecurePass123 "Acme Corp" "gold"
 * 
 * Tiers: silver, gold, platinum
 */

const fs = require("fs");
const path = require("path");
const https = require("https");

// Auto-load .env.local/.env if present (Node does not do this by default)
function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, "utf8");
  content.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;
    const [key, ...rest] = trimmed.split("=");
    const value = rest.join("=");
    if (!process.env[key]) {
      process.env[key] = value;
    }
  });
}

const projectRoot = process.cwd();
loadEnvFile(path.join(projectRoot, ".env.local"));
loadEnvFile(path.join(projectRoot, ".env"));

const args = process.argv.slice(2);

if (args.length < 4) {
  console.error("Usage: node scripts/create-partner.js <email> <password> <company_name> <tier>");
  console.error("Example: node scripts/create-partner.js partner@example.com SecurePass123 \"Acme Corp\" gold");
  process.exit(1);
}

const [email, password, companyName, tier] = args;

// Validate tier
if (!["silver", "gold", "platinum"].includes(tier)) {
  console.error("Invalid tier. Must be one of: silver, gold, platinum");
  process.exit(1);
}

// Validate email
if (!email.includes("@")) {
  console.error("Invalid email address");
  process.exit(1);
}

// Validate password
if (password.length < 8) {
  console.error("Password must be at least 8 characters");
  process.exit(1);
}

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL;

if (!CONVEX_URL) {
  console.error("NEXT_PUBLIC_CONVEX_URL environment variable not set");
  console.error("Please set it in your .env.local file");
  process.exit(1);
}

// Remove trailing slash if present
const baseUrl = CONVEX_URL.replace(/\/$/, "");

const { ConvexHttpClient } = require("convex/browser");

async function createPartner() {
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!convexUrl) {
    throw new Error("NEXT_PUBLIC_CONVEX_URL environment variable not set");
  }

  const client = new ConvexHttpClient(convexUrl);

  const result = await client.mutation("users:createPartnerAccount", {
    email,
    password,
    companyName,
    tier,
  });

  return result;
}

createPartner()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("\n❌ Error creating partner:", err.message);
    process.exit(1);
  });
