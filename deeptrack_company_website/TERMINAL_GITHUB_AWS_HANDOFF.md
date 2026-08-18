# Deeptrack Main Website — Terminal GitHub and AWS Handoff

This guide is for the user-managed release of the completed enterprise due-diligence website. The source archive contains the full Next.js project, including the enterprise repositioning, restored public architecture, SEO changes, visible FAQ, metadata, sitemap, crawler controls, social-preview asset path, and footer line **“A due diligence company.”**

## Before you begin

Download and extract `Deeptrack-Enterprise-Due-Diligence-Full-Site-Migration.zip` from this task. Keep your real production environment files and AWS credentials private. The archive deliberately excludes `.env` files, installed dependencies, and generated `.next` output.

The repository is `https://github.com/deep-track/deeptrack_company_website` and its default branch is `main`. No GitHub push or AWS deployment was performed from this task.

## Safe terminal release path

Run these commands in your local terminal or Cursor terminal. Replace the two paths in the first two lines with the actual extracted location and the folder where you want the repository cloned.

```bash
# 1. Point to the extracted source and clone a clean copy of the real repository.
SOURCE="$HOME/Downloads/deeptrack_company_website-main"
TARGET="$HOME/code/deeptrack_company_website"

git clone https://github.com/deep-track/deeptrack_company_website.git "$TARGET"
cd "$TARGET"
git pull --ff-only origin main

# 2. Create a safety branch before applying the completed source.
git switch -c release/enterprise-due-diligence

# 3. Copy the completed source without replacing the Git history, local secrets, dependencies, or build output.
rsync -a \
  --exclude='.git' \
  --exclude='node_modules' \
  --exclude='.next' \
  --exclude='.env' \
  --exclude='.env.*' \
  "$SOURCE/" "$TARGET/"

# 4. Restore your real local environment file from your existing secure setup.
# Do NOT copy placeholder keys. Keep your production values outside Git.

# 5. Install exactly the declared dependencies and validate the production build.
npm ci
NODE_ENV=production npm run build

# 6. Review the intended release, then commit and push it.
git status
git diff --stat
git add -A
git commit -m "Reposition Deeptrack as an enterprise due diligence company"
git push -u origin release/enterprise-due-diligence
```

After the branch is pushed, open a pull request into `main`, review the changed files, and merge it. If your AWS deployment pipeline tracks `main`, that merge should trigger the existing deployment. If your organization intentionally deploys from a release branch, use the branch your AWS workflow is configured to watch instead.

## Required production environment values

The website build was validated with a placeholder email key only. Your AWS runtime must retain the real environment values already used by the application, including the production Convex URL, Clerk publishable and secret keys, Resend API key, MongoDB values for database-backed handlers, and any existing AWS/DynamoDB settings. Do not commit any of these values to Git.

## AWS deployment note

The supplied source includes AWS SDK dependencies for application functionality, but it did not include an AWS deployment descriptor, an Amplify configuration, an Elastic Beanstalk configuration, a CodeDeploy manifest, an ECS task definition, a CDK/Terraform stack, or an S3/CloudFront publish script. Therefore this task cannot safely name an AWS deployment command without risking deployment to the wrong environment.

Use the AWS release path your current site already uses after the GitHub merge. Common patterns are AWS Amplify connected to `main`, an ECS/CodePipeline workflow triggered from GitHub, or a manual deployment script maintained by your team. If the existing pipeline does not run automatically, use the previously approved internal AWS deployment command or share the specific deployment configuration for a precise command sequence.

## Post-deployment checks

After AWS reports a successful deployment, verify the following addresses in a browser:

```text
https://www.deeptrack.io/
https://www.deeptrack.io/due-diligence
https://www.deeptrack.io/assessment
https://www.deeptrack.io/partners
https://www.deeptrack.io/productApi
https://www.deeptrack.io/industries/flexible-workspaces
https://www.deeptrack.io/robots.txt
https://www.deeptrack.io/sitemap.xml
```

Confirm that the homepage title is **“Enterprise AI, Identity & Media Due Diligence | Deeptrack”**, the footer reads **“A due diligence company.”**, the social metadata resolves to the enterprise asset, and the new enterprise routes return `200` rather than `404`. Then submit the sitemap in Google Search Console and Bing Webmaster Tools so the new site architecture can be recrawled.

## Motion behavior

The rebuilt public enterprise pages intentionally avoid scroll-triggered or JavaScript-driven entrance animations. They use only short hover feedback and native disclosure interactions, so primary content does not depend on an animation completing before it becomes visible. A global reduced-motion safeguard also removes non-essential animation and smooth scrolling when a visitor has enabled the operating system’s **Reduce Motion** preference.
