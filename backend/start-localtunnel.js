/**
 * This script is started always before running the backend with any command (check package.json scripts).
 * It is required because we cannot manage multiple telegram bot instances in the same nodejs instance with the default
 * polling way. We need webhooks to handle multiple processes, and we need a public secure domain to use webhooks, we can't
 * use localhost and http only. Instead of ngrok we use localtunnel:
 * 
 * https://theboroer.github.io/localtunnel-www/
 */

const { spawn } = require('child_process');
const fs = require('fs/promises');
const path = require('path');

async function updateEnvAndStartTunnel() {
  try {
    // Spawn the localtunnel process
    const localtunnel = spawn('lt', ['--port', 3000]);

    let url = '';

    // Capture the localtunnel output
    localtunnel.stdout.on('data', (data) => {
      console.log(`LocalTunnel output: ${data.toString()}`);
      const output = data.toString().trim();
      const matches = output.match(/https:\/\/[^\s]+/);
      if (matches) {
        url = matches[0];
        console.log(`LocalTunnel URL: ${url}`);

        // Update the .env file with the extracted URL
        const envPath = path.join(__dirname, '.env');

        fs.readFile(envPath, 'utf-8')
          .then(existingEnv => {
            // Replace the existing WEBHOOK_URL if it exists
            const updatedEnv = existingEnv.includes('WEBHOOK_URL=')
              ? existingEnv.replace(/WEBHOOK_URL=.*/, `WEBHOOK_URL=${url}`)
              : `${existingEnv}\nWEBHOOK_URL=${url}`;

            return fs.writeFile(envPath, updatedEnv);
          })
          .then(() => {
            console.log('.env file updated successfully');
          })
          .catch(error => {
            if (error.code === 'ENOENT') {
              // Handle case where .env file does not exist
              return fs.writeFile(envPath, `WEBHOOK_URL=${url}`)
                .then(() => {
                  console.log('.env file created successfully');
                });
            } else {
              console.error('Error reading or writing .env file:', error);
            }
          });
      }
    });

    localtunnel.stderr.on('data', (data) => {
      console.error(`LocalTunnel error: ${data.toString()}`);
    });

    localtunnel.on('exit', (code) => {
      if (code !== 0) {
        console.error(`LocalTunnel process exited with code ${code}`);
      }
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

updateEnvAndStartTunnel();
