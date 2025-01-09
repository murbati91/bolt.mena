import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import type { LoaderFunction } from '@remix-run/node';

export const loader: LoaderFunction = async () => {
  const projectRoot = path.resolve(__dirname, '../../../'); // Adjust the path to your project root
  const zipFilePath = path.resolve(projectRoot, 'source-code.zip');

  try {
    // Dynamically generate the zip file using 7-Zip
    await new Promise<void>((resolve, reject) => {
      exec(
        `"C:\\Program Files\\7-Zip\\7z.exe" a -tzip ${zipFilePath} * -x!node_modules\\* -x!.git\\* -x!.env`,
        { cwd: projectRoot },
        (error, stdout, stderr) => {
          if (error) {
            console.error(`Error creating zip file: ${stderr}`);
            reject(new Error('Error generating source code archive'));
          }

          resolve();
        },
      );
    });

    // Check if the file exists
    if (!fs.existsSync(zipFilePath)) {
      return new Response('Source code file not found', { status: 404 });
    }

    // Read the file as a Buffer to serve it
    const fileBuffer = fs.readFileSync(zipFilePath);

    return new Response(fileBuffer, {
      headers: {
        'Content-Disposition': `attachment; filename=source-code.zip`,
        'Content-Type': 'application/zip',
      },
    });
  } catch (err) {
    console.error(err);
    return new Response('Internal server error', { status: 500 });
  }
};
