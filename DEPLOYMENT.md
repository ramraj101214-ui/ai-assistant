# Deployment Guide

Quick guides for deploying Smart Assistant to popular platforms.

## 🎯 Pre-Deployment Checklist

- [ ] `.env` is in `.gitignore` (never commit secrets)
- [ ] `.env.example` is committed (template for users)
- [ ] `node_modules/` is in `.gitignore`
- [ ] All tests pass locally
- [ ] README.md is up to date

---

## 🔵 Heroku

### Step 1: Install Heroku CLI
```bash
# macOS
brew tap heroku/brew && brew install heroku

# Windows
choco install heroku-cli
```

### Step 2: Login and Create App
```bash
heroku login
heroku create your-app-name
```

### Step 3: Set Environment Variables
```bash
heroku config:set GEMINI_API_KEY=your_key
heroku config:set NODE_ENV=production
heroku config:set PORT=80
```

### Step 4: Deploy
```bash
git push heroku main
```

### Step 5: View Logs
```bash
heroku logs --tail
```

### Step 6: Open App
```bash
heroku open
```

**Your app is live at**: `https://your-app-name.herokuapp.com`

---

## 🟣 Railway

### Step 1: Sign Up at Railway
Go to [railway.app](https://railway.app)

### Step 2: Connect GitHub
- Click "New Project"
- Select "Deploy from GitHub repo"
- Authorize and select your fork

### Step 3: Set Variables
In Railway dashboard:
- Go to Variables
- Add `GEMINI_API_KEY` = your key
- Add `NODE_ENV` = production

### Step 4: Deploy
Railway auto-deploys on `git push`

**Your app is live at**: `https://your-project.up.railway.app`

---

## ⚪ Vercel

### Step 1: Sign Up at Vercel
Go to [vercel.com](https://vercel.com)

### Step 2: Import Project
- Click "New Project"
- Select "Import Git Repository"
- Choose your GitHub repo

### Step 3: Configure
- Framework: Node.js
- Root Directory: ./
- Environment Variables:
  - `GEMINI_API_KEY` = your key
  - `NODE_ENV` = production

### Step 4: Deploy
Click "Deploy" — Vercel handles the rest

**Your app is live at**: `https://your-project.vercel.app`

---

## 🟢 Google Cloud Run

### Step 1: Install Google Cloud SDK
```bash
# macOS
brew install --cask google-cloud-sdk

# Windows
# Download from: https://cloud.google.com/sdk/docs/install
```

### Step 2: Authenticate
```bash
gcloud auth login
gcloud config set project your-project-id
```

### Step 3: Create Dockerfile
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

### Step 4: Deploy
```bash
gcloud run deploy smart-assistant \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars GEMINI_API_KEY=your_key,NODE_ENV=production
```

**Your app is live at**: `https://smart-assistant-xxx.run.app`

---

## 🐳 Docker (Local or Any Server)

### Step 1: Create Dockerfile (if not using Cloud Run)
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

### Step 2: Build Image
```bash
docker build -t smart-assistant .
```

### Step 3: Run Container
```bash
docker run -p 3000:8080 \
  -e GEMINI_API_KEY=your_key \
  -e NODE_ENV=production \
  smart-assistant
```

Access at: `http://localhost:3000`

---

## 📋 Environment Variables by Platform

### Heroku
```bash
heroku config:set VAR_NAME=value
```

### Railway
Dashboard → Variables

### Vercel
Dashboard → Settings → Environment Variables

### Cloud Run
Add `--set-env-vars KEY=VALUE` to deploy command

### Docker
Use `-e VAR_NAME=value` flags

---

## 🔍 Post-Deployment Verification

After deploying, test your app:

```bash
# Test health endpoint
curl https://your-app.com/health

# Test AI generation
curl -X POST https://your-app.com/api/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Say hello"}'
```

---

## 🚨 Common Issues

### Issue: App crashes on startup
Check logs:
```bash
heroku logs --tail  # Heroku
# or
gcloud run logs read smart-assistant --limit 50  # Cloud Run
```

### Issue: CORS error in browser
Make sure `ALLOWED_ORIGINS` includes your domain:
```env
ALLOWED_ORIGINS=https://yourdomain.com
```

### Issue: API key not working
- Verify key is valid at [Google AI Studio](https://aistudio.google.com/app/apikey)
- Check environment variable is set correctly
- Test locally first

### Issue: 502/503 errors
Usually means the API backend is temporarily down. Add retry logic or use fallback model.

---

## 📞 Support

For deployment issues:
1. Check logs first
2. Verify environment variables
3. Test locally to isolate the problem
4. Open an issue on GitHub
