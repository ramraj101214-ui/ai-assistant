# AI Assistant — Quick Install

> **Fastest setup:** Follow these steps if you only want to install and run the application.

### 1. Install Node.js

Download and install the **Node.js LTS** version (18 or higher).

After installation, open **PowerShell** and verify:

```powershell
node --version
npm --version
```

### 2. Open the Project

#### PowerShell (Windows)

```powershell
cd "$HOME\Documents\AI Assistant"
```

> If your project is stored somewhere else, replace the path with your actual project folder.

### 3. Install Dependencies

#### PowerShell / Terminal

```powershell
npm install
```

### 4. Configure `.env`

Create a `.env` file in the project root:

```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3000
```

Replace `your_gemini_api_key_here` with your Gemini API key.

### 5. Start the Application

#### PowerShell / Terminal

```powershell
node server.js
```

### 6. Open the App

Open your browser and visit:

```text
http://localhost:3000
```

### 7. Stop the Server

In the same **PowerShell / Terminal** window:

```text
Ctrl + C
```

> **That's it!** Select a template, enter the required details, and click **Generate AI Response**.

