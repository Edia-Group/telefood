const { spawn } = require('child_process');
const fs = require('fs/promises');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

async function updateEnvFile(url) {
  const envPath = path.join(process.cwd(), '.env');
  console.log("PATH", envPath);
  
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

let tunnelProcess;

function startLocaltunnel() {
  return new Promise((resolve, reject) => {
    console.log('Starting localtunnel...');
    tunnelProcess = spawn('lt', ['--port', 3000]);

    tunnelProcess.stdout.on('data', async (data) => {
      console.log(`LocalTunnel output: ${data.toString().trim()}`);
      const matches = data.toString().match(/https:\/\/[^\s]+/);
      if (matches) {
        const url = matches[0];
        console.log(`LocalTunnel URL: ${url}`);
        await updateEnvFile(url);
        resolve(url);
      }
    });

    tunnelProcess.stderr.on('data', (data) => {
      console.error(`LocalTunnel error: ${data.toString().trim()}`);
    });

    tunnelProcess.on('exit', (code) => {
      console.log(`LocalTunnel process exited with code ${code}`);
      if (code !== 0) {
        reject(new Error(`LocalTunnel process exited with code ${code}`));
      }
    });
  });
}

function startLocalhostRun() {
  return new Promise((resolve, reject) => {
    console.log('Starting localhost.run...');
    tunnelProcess = spawn('ssh', ['-R', '80:localhost:3000', 'nokey@localhost.run']);

    tunnelProcess.stdout.on('data', async (data) => {
      console.log(`localhost.run output: ${data.toString().trim()}`);
      const matches = data.toString().match(/https:\/\/[^\s]+/);
      if (matches) {
        const url = matches[0];
        console.log(`localhost.run URL: ${url}`);
        await updateEnvFile(url);
        resolve(url);
      }
    });

    tunnelProcess.stderr.on('data', (data) => {
      console.error(`localhost.run error: ${data.toString().trim()}`);
    });

    tunnelProcess.on('exit', (code) => {
      console.log(`localhost.run process exited with code ${code}`);
      if (code !== 0) {
        reject(new Error(`localhost.run process exited with code ${code}`));
      }
    });
  });
}

async function stopTunnel() {
  if (tunnelProcess) {
    tunnelProcess.kill();
  }
}

async function updateEnvAndStartTunnel() {
  try {
    const tunnelService = process.env.TUNNEL_SERVICE || 'localtunnel';
    let url;

    if (tunnelService === 'localtunnel') {
      url = await startLocaltunnel();
    } else if (tunnelService === 'localhost.run') {
      url = await startLocalhostRun();
    } else {
      throw new Error(`Unknown tunnel service: ${tunnelService}`);
    }

    console.log(`Tunnel established at: ${url}`);
  } catch (error) {
    console.error('Failed to start tunnel:', error);
  }
}

module.exports = {
  updateEnvAndStartTunnel,
  stopTunnel,
};