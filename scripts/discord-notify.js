#!/usr/bin/env node

const https = require('https');

const {
  BRANCH,
  COMMIT_REF,
  DEPLOY_URL,
  CONTEXT,
  BUILD_ID,
} = process.env;

const embed = {
  title: '✅ Deployment Successful',
  color: 0x00ff00,
  fields: [
    { name: 'Branch', value: BRANCH || 'unknown', inline: true },
    { name: 'Environment', value: CONTEXT || 'unknown', inline: true },
    { name: 'Commit', value: COMMIT_REF?.substring(0, 7) || 'unknown', inline: true },
    { name: 'Build ID', value: BUILD_ID || 'unknown', inline: true },
    { name: 'URL', value: `[View Deployment](${DEPLOY_URL})`, inline: false },
  ],
  timestamp: new Date().toISOString(),
};

const payload = JSON.stringify({ embeds: [embed] });

const options = {
  hostname: 'discord.com',
  path: '/api/webhooks/1487266613026750577/vyPIMh8o5m5crUc311avrTF3bj5JG-CoKlwGbR_4ITcurSI-C3GvTPZMBHcg1aCA7l3h',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': payload.length,
  },
};

const req = https.request(options, (res) => {
  console.log(`Discord notification sent (${res.statusCode})`);
});

req.on('error', (e) => {
  console.error(`Failed to send Discord notification: ${e.message}`);
  process.exit(1);
});

req.write(payload);
req.end();
