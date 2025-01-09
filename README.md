Bahrain-Based Custom Bolt DIY Repository by Salahuddin Softech Solution

Bolt MENA is a customized version of Bolt DIY tailored for the MENA region. Developed in Bahrain, this project emphasizes localized components, enhanced security, and ease of deployment. It also includes features for white labeling and source code distribution.

## Features
- **Localized Branding**: Configurable branding through `config/branding.js`.
- **Source Code Download**: Users can download the source code as a zip file.
- **White Labeling**: Customizable app name, logo, and styles.
- **Cloud Deployment**: Easily deployable on Vercel.

## Installation

### Prerequisites
- Node.js (>=18.18.0)
- PNPM package manager
- Vercel CLI

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/murbati91/bolt.mena.git
   cd bolt.mena
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Run the development server:
   ```bash
   pnpm run dev
   ```

4. Open the app in your browser:
   ```
   http://localhost:5173
   ```



1. Install the Vercel CLI globally:
   ```bash
   npm install -g vercel
   ```

2. Deploy the application:
   ```bash
   pnpm run deploy:vercel
   ```

### Environment Variables
Configure the `.env` file with the required API keys and endpoints:
```env
OPEN_ROUTER_API_KEY=
GOOGLE_GENERATIVE_AI_API_KEY=
OLLAMA_API_BASE_URL=http://localhost:3000
OPENAI_LIKE_API_BASE_URL=
```

## White Labeling

1. Update the `config/branding.js` file:
   ```javascript
   const branding = {
     appName: "Bolt MENA",
     logoPath: "/logo.svg",
     primaryColor: "#4CAF50",
     footerText: "© 2025 Bolt MENA. All rights reserved.",
   };

   export default branding;
   ```

2. Use `branding.js` in your components:
   ```javascript
   import branding from "../config/branding";

   console.log(branding.appName);
   ```

## Source Code Download

### Setting up Source Code Download Feature

1. Ensure the `source-code.zip` file is located in the project root directory. Example:
   ```
   C:/Users/Faisal/Documents/bolt.mena-main/source-code.zip
   ```

2. Add the following API route in `functions/download.js`:
   ```javascript
   import fs from "fs";
   import path from "path";

   export default function handler(req, res) {
     const file = path.resolve(__dirname, "../source-code.zip");
     if (!fs.existsSync(file)) {
       res.status(404).send("Source code file not found");
       return;
     }
     res.setHeader("Content-Disposition", "attachment; filename=source-code.zip");
     res.setHeader("Content-Type", "application/zip");

     const fileStream = fs.createReadStream(file);
     fileStream.pipe(res);
   }
   ```

3. Add a download button component in `functions/DownloadSourceButton.js`:
   ```javascript
   import React from "react";

   export default function DownloadSourceButton() {
     const handleDownload = async () => {
       const response = await fetch("/api/download");
       if (response.status === 404) {
         alert("Source code file not found on the server.");
         return;
       }
       const blob = await response.blob();
       const link = document.createElement("a");
       link.href = URL.createObjectURL(blob);
       link.download = "source-code.zip";
       link.click();
     };

     return (
       <button onClick={handleDownload} style={{ padding: "10px", margin: "10px" }}>
         Download Source Code
       </button>
     );
   }
   ```

4. Test the functionality locally by navigating to `/api/download`.

## Contributing
Contributions are welcome! Feel free to fork the repository and submit a pull request.

## License
This project is licensed under the MIT License.
