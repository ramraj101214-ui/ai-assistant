# Contributing to Smart Assistant

Thanks for your interest in contributing! This guide will help you get started.

## 🎯 Ways to Contribute

- 🐛 **Report bugs** — Found an issue? Open a GitHub Issue
- 💡 **Suggest features** — Ideas for improvement? Start a Discussion
- 📝 **Improve docs** — Help clarify README or add examples
- 🎨 **Enhance UI/UX** — Design improvements welcome
- ✨ **Add features** — New templates, AI models, or backend features

---

## 🚀 Getting Started

### 1. Fork the Repository
Click "Fork" on GitHub to create your own copy.

### 2. Clone Your Fork
```bash
git clone https://github.com/YOUR_USERNAME/smart-assistant.git
cd smart-assistant
```

### 3. Create a Feature Branch
```bash
git checkout -b feature/your-feature-name
```

Use descriptive names:
- `feature/add-json-template` ✅
- `fix/cors-headers` ✅
- `docs/update-readme` ✅
- `wip` ❌ (too vague)

### 4. Make Your Changes
```bash
npm install
node server.js  # Test locally
```

### 5. Commit with Clear Messages
```bash
git add .
git commit -m "Add: New template for JSON response formatting"
```

**Commit message format:**
- `Add: New feature`
- `Fix: Bug fix`
- `Docs: Documentation update`
- `Refactor: Code cleanup`
- `Test: Add/update tests`

### 6. Push and Create Pull Request
```bash
git push origin feature/your-feature-name
```

Go to GitHub and click "Compare & pull request". 

**PR description should include:**
- What does it do?
- Why is it needed?
- Screenshots (if UI changes)
- Testing instructions

---

## 📋 Code Guidelines

### Frontend (JavaScript)
```javascript
// ✅ Good
const parseVariables = (template) => {
  const regex = /\[(.*?)\]/g;
  return [...template.matchAll(regex)].map(m => m[1]);
};

// ❌ Bad
function pv(t){return [...t.matchAll(/\[(.*?)\]/g)].map(m=>m[1]);}
```

- Use meaningful variable names
- Add comments for complex logic
- Follow Airbnb Style Guide

### Backend (Node.js)
```javascript
// ✅ Good
app.post('/api/generate', async (req, res) => {
  try {
    const { prompt } = req.body;
    
    // Validate
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt required' });
    }
    
    // Process
    const response = await generateAI(prompt);
    res.json({ result: response });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ❌ Bad
app.post('/api/generate', (req, res) => {
  res.json({ result: generateAI(req.body.prompt) });
});
```

- Always validate input
- Handle errors explicitly
- Use async/await (not callbacks)
- Add security checks

### CSS & Design Tokens
```css
/* ✅ Good - Use token variables */
.card {
  background-color: var(--surface-card);
  border: 1px solid var(--card-border);
  border-radius: 0.75rem;
}

/* ❌ Bad - Hardcoded colors */
.card {
  background-color: #0f0b18;
  border: 1px solid #231a33;
}
```

---

## 🧪 Testing Before PR

### Test Locally
```bash
# Start server
node server.js

# In another terminal, test endpoints
curl http://localhost:3000/health

curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Say hello"}'
```

### Check for Errors
- Open browser DevTools (F12)
- Check Console for JavaScript errors
- Check Network tab for failed requests

### Security Checklist
- [ ] No hardcoded API keys
- [ ] No sensitive data in logs
- [ ] Input validation present
- [ ] Error messages don't leak internals

---

## 📁 File Structure for New Features

### Adding a New Template
1. Edit `public/index.html` — Add option to select
2. No backend changes needed — Templates are client-side

### Adding an API Endpoint
1. Add route in `server.js`
2. Add validation and error handling
3. Update README with endpoint documentation
4. Test with curl before submitting PR

### Adding Design Changes
1. Update `public/styles/tokens.css` (variables)
2. Update `public/styles/theme.css` (components)
3. Test in both dark and light modes
4. Include screenshot in PR

---

## 📦 Dependencies

### Adding a New Package
Only add dependencies if necessary. Before adding:

1. Check if built-in Node modules cover it
2. Consider bundle size impact
3. Verify package is maintained and secure

```bash
npm install package-name
npm audit  # Check for vulnerabilities
```

**Update `package.json` in your commit.**

---

## 🔍 Code Review Process

### Your PR Will Be Reviewed For:
- ✅ Code quality and style
- ✅ Security (no vulnerabilities)
- ✅ Testing (works as expected)
- ✅ Documentation (changes documented)
- ✅ Performance (no slowdowns)

### Responding to Feedback
- Don't be defensive — feedback improves code
- Ask for clarification if confused
- Make requested changes promptly
- Reply to comments when done

---

## 🐛 Reporting Bugs

### Before Creating an Issue
- Search existing issues first (might already be reported)
- Test with latest code
- Check if it's a local environment issue

### When Creating an Issue
Include:
- **Title**: Clear, one-line summary
- **Description**: What happened, expected behavior
- **Steps to Reproduce**: Exact steps to trigger bug
- **Environment**: OS, Node version, Browser
- **Screenshots**: If applicable
- **Error Messages**: Full error logs

**Example**:
```
Title: Template variables not populating in input fields

Description:
When I select "Email Generator" template, no input fields appear.

Steps:
1. Open http://localhost:3000
2. Select "Email Generator" from dropdown
3. Expected: Three input fields for [Tone], [Audience], [Topic]
4. Actual: No fields appear

Environment:
- OS: Windows 11
- Node: v20.10.0
- Browser: Chrome 130
```

---

## ✨ First-Time Contributor?

**Start with these:**
- 🏷️ Issues labeled `good first issue`
- 📝 Documentation improvements
- 🎨 UI/UX tweaks

---

## 💬 Getting Help

- 📧 Email: contact@example.com
- 💬 GitHub Discussions: Ask questions
- 🐛 GitHub Issues: Report bugs

---

## 📜 License

By contributing, you agree your code is licensed under MIT License.

---

**Happy coding! 🚀**
