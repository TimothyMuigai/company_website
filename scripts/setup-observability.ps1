# Prepare PostHog + Sentry for local dev
$ErrorActionPreference = "Stop"
Set-Location (Resolve-Path "$PSScriptRoot\..")

Write-Host "Installing PostHog and Sentry packages..."
npm install posthog-js posthog-node @sentry/nextjs

if (-not (Test-Path ".env.local")) {
    Copy-Item ".env.example" ".env.local"
    Write-Host "Created .env.local from .env.example — add your keys before running the site."
} else {
    Write-Host ".env.local already exists — add any missing keys from .env.example"
}

Write-Host ""
Write-Host "Next steps:"
Write-Host "  1. Edit .env.local (PostHog phc_ key + Sentry DSN)"
Write-Host "  2. npm run dev"
Write-Host "  3. See OBSERVABILITY.md for verification"
Write-Host ""
