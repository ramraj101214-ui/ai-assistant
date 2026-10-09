# AI Assistant 🤖

> A simple, web-based AI Prompt Engine built with Node.js, Express.js, JavaScript, and the Google Gemini API.
>
>
>

The application provides a structured workspace where users select a built-in prompt template, provide relevant details (tone, audience, topic), and generate structured AI responses.

## ✨ Features

- 🧩 **Built-in Prompt Templates:** Pre-designed templates for common workflows.

- ✉️ **Email Generator:** Drafts structured professional or casual email content.

- 🧠 **Expert Explainer:** Explains complex topics at specified depth levels.

- 🎯 **Strategy Creator:** Formulates step-by-step strategic plans.

- 🎨 **Customization Control:** Adjustable tone, target audience, and topic parameters.

- 🤖 **Powered by Gemini API:** Backend interaction with Google's Gemini models.

- ⚡ **Lightweight Backend:** Fast Express.js server architecture.

- 🔐 **Secure Environment:** API key protection using local environment variables.

- 🌐 **Clean UI & Responsive Workspace:** Multi-device compatible layout.




## 🖥️ How the Interface Works

The application uses a **Prompt Engine** workflow rather than a standard open-ended chat interface.

```
┌─────────────────────────────────────────┐
│              Prompt Engine              │
├──────────────────────┬──────────────────┤
│  Select Template     │   Workspace      │
│                      │                  │
│  • Email Generator   │                  │
│  • Expert Explainer  │   Your generated │
│  • Strategy Creator  │   AI response    │
│                      │   appears here   │
│                      │                  │
│                      │                  │
│  [Generate Response] │                  │
└──────────────────────┴──────────────────┘

```

### Basic Workflow

1. Select a template from the sidebar.

2. Choose or enter the desired **Tone**.

3. Choose or enter the target **Audience**.

4. Enter the primary **Topic**.

5. Click **Generate AI Response**.

6. View the generated result in the workspace panel.




> [!NOTE]
>
> If no template has been selected yet, the workspace displays:
>
> *"Your workspace is empty. Select a template on the left and hit generate!"*
>
>
>

## 🧩 Available Templates

### ✉️ Email Generator

Creates structured email content tailored to specific recipients and communication styles.

- **Best for:** Professional correspondence, outreach, inquiry emails, and follow-ups.




### 🧠 Expert Explainer

Breaks down complex subjects into digestible explanations adjusted to audience familiarity.

- **Best for:** Teaching, technical summaries, beginner tutorials, and executive briefs.




### 🎯 Strategy Creator

Generates actionable plans, tactical steps, and strategic approaches aimed at specific goals.

- **Best for:** Project planning, marketing frameworks, problem-solving, and decision-making.




## 🧰 Technologies Used

| **Technology**        | **Category**   | **Purpose**                                            |
| --------------------- | -------------- | ------------------------------------------------------ |
| **HTML5**             | Frontend       | Application markup and structural layout               |
| **CSS3**              | Frontend       | Interface styling, themes, and design tokens           |
| **JavaScript (ES6+)** | Frontend       | UI logic, dynamic interactions, and fetch API requests |
| **Node.js**           | Backend        | JavaScript runtime environment                         |
| **Express.js**        | Backend        | HTTP web server and API route handling                 |
| **Google Gemini API** | AI Integration | Response generation service                            |
| **dotenv**            | Utility        | Environment variable management for API keys           |

## 📁 Project Structure

Plaintext

```
AI Assistant/
│
├── public/                  # Static frontend assets
│   ├── index.html           # Main Prompt Engine interface
│   ├── script.js            # Client-side UI logic and API calls
│   └── styles/
│       ├── tokens.css       # Design variables (colors, typography)
│       └── theme.css        # Core interface styling
│
├── .env                     # Environment variables (API Key, Port)
├── .gitignore               # Git exclusion rules
├── package.json             # NPM package dependencies and scripts
├── package-lock.json        # Dependency lock file
├── README.md                # Project documentation
└── server.js                # Express server and Gemini API logic

```

> [!TIP]
>
> The `node_modules/` folder is generated automatically during package installation and should not be tracked by version control.
>
>
>

## 📋 Prerequisites

Before running the application, ensure the following software is installed on your system.

### Why these are required

- **Node.js:** Runs the JavaScript backend outside the browser. This project requires Node.js `18.0.0` or higher.
- **npm:** Node Package Manager. It installs and manages the packages required by the project. npm is included automatically with Node.js.
- **Google Gemini API Key:** Allows the backend to securely communicate with Google's Gemini API and generate AI responses.

- **Node.js:** Version `18.0.0` or higher ([Download Node.js LTS](https://nodejs.org/))

- **npm:** Automatically included with Node.js installation

- **Google Gemini API Key:** Issued via [Google AI Studio](https://aistudio.google.com/)




### Verification Commands

Use the command section for your operating system.

#### PowerShell (Windows)

```powershell
node --version
npm --version
```

#### Bash / Zsh (macOS & Linux)

```bash
node -v
npm -v
```

## 🚀 Installation & Setup

### Step 1: Navigate to Project Directory

#### PowerShell (Windows)

PowerShell

```
Set-Location -Path "$HOME\Documents\AI Assistant"

```

#### Bash / Zsh (macOS & Linux)

Bash

```
cd ~/Documents/"AI Assistant"

```

Verify you are in the correct directory.

#### PowerShell (Windows)

```powershell
Get-ChildItem package.json, server.js
```

#### Bash / Zsh (macOS & Linux)

```bash
ls -la package.json server.js
```

### Step 2: Install Dependencies

Download and install the necessary package dependencies listed in `package.json`.

#### PowerShell / Terminal

```powershell
npm install
```

### Step 3: Configure Environment Variables

Create a `.env` file in the **project root directory**, next to `package.json` and `server.js`.

Example:

Code snippet

```
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3000

```

> [!WARNING]
>
> Replace `your_gemini_api_key_here` with your actual key. Never commit your `.env` file or expose your API key publicly.
>
>
>

## ▶️ Running the Application

### 1. Start the backend Express server

#### PowerShell / Terminal

```powershell
node server.js
```

### 2. Open the application

Open your web browser and go to:

```text
http://localhost:3000
```

### 3. Stop the server

In the same **PowerShell / Terminal** window, press:

```text
Ctrl + C
```




## 🔄 Application Architecture & Flow

Code snippet

```
flowchart TD
    A[User Inputs Details] -->|Tone, Audience, Topic| B[Select Template]
    B -->|Click Generate| C[script.js]
    C -->|POST /api/generate| D[Express Backend server.js]
    D -->|Secure API Key Request| E[Google Gemini API]
    E -->|Generated Text| D
    D -->|JSON Response| C
    C -->|Render Output| F[Workspace Display]

```

Rather than open-ended chatting, prompt inputs are structured programmatically before reaching the API backend.

## 🔌 API Specification

### `POST /api/generate`

Executes prompt generation through the configured Gemini API connection. The endpoint is used by the application's built-in template workflow rather than as a general-purpose open chat endpoint.

#### Request Headers

HTTP

```
Content-Type: application/json

```

#### Request Body

JSON

```
{
  "prompt": "Generated prompt payload based on template selection and user input parameters."
}

```

#### Success Response (`200 OK`)

JSON

```
{
  "result": "AI-generated text output based on provided specifications."
}

```

## 🧪 Example Workflows

### Example 1: Email Generator

- **Template:** Email Generator

- **Tone:** Professional

- **Audience:** College Professor

- **Topic:** Request for internship opportunity




**Result:** Generates a structured formal email requesting an internship opportunity with appropriate academic salutations and context.

### Example 2: Expert Explainer

- **Template:** Expert Explainer

- **Tone:** Simple

- **Audience:** Beginner

- **Topic:** Artificial Intelligence




**Result:** Generates an accessible, jargon-free breakdown of core AI concepts suitable for a beginner.

## 🛠️ Troubleshooting

### Command Execution Issues

> [!IMPORTANT]
>
> `node` **or** `npm` **is not recognized**
>
> - **Cause:** Node.js is not installed or not added to your system `PATH`.
>
> - **Solution:** Reinstall Node.js LTS, restart your terminal, and run `node -v` to confirm.
>
>
>

> [!IMPORTANT]
>
> `npm install` **fails**
>
> - **Cause:** Terminal is not running inside the root directory containing `package.json`.
>
> - **Solution:** Ensure you navigate into the project root directory (`cd "AI Assistant"`) before running `npm install`.
>
>
>

### API & Server Errors

> [!ERROR]
>
> **404 Model Not Found**
>
> - **Cause:** The Gemini model version specified in `server.js` is deprecated or unavailable for your key type.
>
> - **Solution:** Update the model string in `server.js` (e.g., `gemini-2.5-flash` or `gemini-1.5-flash`).
>
>
>

> [!ERROR]
>
> **503 Service Unavailable**
>
> - **Cause:** Temporary upstream service latency or rate limiting from the Gemini API.
>
> - **Solution:** Wait a few moments and resubmit the request.
>
>
>

> [!IMPORTANT]
>
> **Port 3000 is already in use (**`EADDRINUSE`**)**
>
> - **Cause:** Another process or background server is bound to port `3000`.
>
> - **Solution:** Update `PORT=3001` in `.env` and start the server again.
>
>
>

### Workspace remains empty

> [!IMPORTANT]
>
> **The workspace still shows the empty-state message**
>
> - **Cause:** A template may not have been selected, required fields may be empty, or the backend may not be running.
> - **Solution:** Select a template, provide the requested details, click **Generate AI Response**, and confirm that `node server.js` is running.

## 🔒 Security Best Practices

- Keep `GEMINI_API_KEY` stored exclusively inside `.env`.

- Never place or reference API keys in client-side code (`public/script.js`).

- Ensure `.env` and `node_modules/` remain listed inside `.gitignore`.

- Keep API request orchestration restricted to backend server routes.

- Revoke and rotate your API key immediately if exposed inadvertently.

### Recommended `.gitignore`

```gitignore
.env
node_modules/
```




## 📌 Future Roadmap

- [ ] Add dynamic custom template creation.

- [ ] Integrate Markdown response rendering (`marked.js`).

- [ ] One-click "Copy to Clipboard" and response export options.

- [ ] Response history and session persistence via local storage.

- [ ] Real-time streaming response capability (`Server-Sent Events`).

- [ ] Dark/Light interface theme toggle.

- [ ] Model selection toggle (Fast vs. High-Reasoning models).




## 📄 License & Contributing

- **License:** Educational and personal use.

- **Contributing:** Pull requests, template additions, and issue reports are welcome.
