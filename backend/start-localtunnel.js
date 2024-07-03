/**
 * This script is started always before running the backend with any command (check main.ts).
 * It is required because we cannot manage multiple telegram bot instances in the same nodejs instance with the default
 * polling way. We need webhooks to handle multiple processes, and we need a public secure domain to use webhooks, we can't
 * use localhost and http only. Instead of ngrok we use localtunnel:
 * 
 * https://theboroer.github.io/localtunnel-www/
 */

const { spawn } = require('child_process');
const fs = require('fs/promises');
const path = require('path');

async function updateEnvFile(url) {
  const envPath = path.join(process.cwd(), '.env');
  console.log("PATH",envPath)
  
  try {
    let existingEnv = await fs.readFile(envPath, 'utf-8');
    const updatedEnv = existingEnv.includes('WEBHOOK_URL=')
      ? existingEnv.replace(/WEBHOOK_URL=.*/, `WEBHOOK_URL=${url}`)
      : `${existingEnv}\nWEBHOOK_URL=${url}`;
    await fs.writeFile(envPath, updatedEnv);
    console.log('.env file updated successfully');
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.writeFile(envPath, `WEBHOOK_URL=${url}`);
      console.log('.env file created successfully');
    } else {
      console.error('Error reading or writing .env file:', error);
    }
  }
}

let localtunnel;

async function startLocalTunnel() {
  return new Promise((resolve, reject) => {
    localtunnel = spawn('lt', ['--port', 3000]);

    localtunnel.stdout.on('data', async (data) => {
      console.log(`LocalTunnel output: ${data.toString()}`);
      const output = data.toString().trim();
      const matches = output.match(/https:\/\/[^\s]+/);
      if (matches) {
        const url = matches[0];
        console.log(`LocalTunnel URL: ${url}`);
        try {
          await updateEnvFile(url);
          resolve();
        } catch (err) {
          reject(err);
        }
      }
    });

    localtunnel.stderr.on('data', (data) => {
      console.error(`LocalTunnel error: ${data.toString()}`);
    });

    localtunnel.on('exit', (code) => {
      if (code !== 0) {
        reject(new Error(`LocalTunnel process exited with code ${code}`));
      }
    });
  });
}

async function stopLocalTunnel() {
  if (localtunnel) {
    localtunnel.kill();
  }
}

async function updateEnvAndStartTunnel() {
  try {
    await startLocalTunnel();
  } catch (error) {
    console.error('Failed to start LocalTunnel:', error);
  }
}

module.exports = {
  updateEnvAndStartTunnel,
  stopLocalTunnel,
};
