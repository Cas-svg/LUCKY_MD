const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUhicHBOYldpeXV3d1hVbWJJMHY5ZllTMHRNSTFmclY4T0NpYXNpdnMzOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTm5ad3BkNC9ldzJNV2RrY3VnZk5odGhRNFVzMG9jZUhmRUVJTFlDVlNWTT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwRGxrVzN6blJMQVlKYUlvSlJiUWY5NDZhaUlmYVlyUkF6V01uM1VEU2xrPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrbXVFNzZQK0tlWHIwN0E4OUNHWmZJaU9BNHdPUUpxVkhOOVUxclBjM2tVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNLeUJ5c0dZL005YnZ2eE5UOU1RY2Rya05nZ2loVmhVeEFETEU4ZkhIR289In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Inh1UDJ5blhBU2hQWXAyZ2swZDlTaytmMTZtcXpNVm4wSXpKdDM3YXVjRkk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV0hlcHRBZFlNVDlFM0RzenMxZnRXNllXL0x5bXhqM2dtMm1sUXUxdkJtQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaENDNHJsaVdHZFFCS296UE9jczN2bDJCZEdLMlFhWmh4bFBGQ0J0dWZYYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjMvMFdzbDBDN1VFWjJaTHp5SmZESDFPWEZvWGR0bHVWZ09qaVlkNWYrL2t1a2RBNnVtZXVYN3VOU29hbnl2WjZzeFJzNFhPYTR3UmR6NHZCV0I1OWhBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTAsImFkdlNlY3JldEtleSI6IkhrdDZOTWdTTm1Tclc0RU5oT1ZSZkpPMVFnQmRWY1AxbUNCd05oY3oralk9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IlVsZTRzOWhVUm5hM2h4NVM4dExwNHciLCJwaG9uZUlkIjoiNTY2NzI5OTgtZGFhZC00MTVjLWJiMWEtYWM3ZmU1NmQwNjYyIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBqczJaNXFuK0FyUTBsT0cvZ1RNaDdTcW01WT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0ZUZZR1hseTJ6MkJkWitVdGRrc2FxZmhvalE9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiSzg0WURTVjkiLCJtZSI6eyJpZCI6IjI2MzcxOTQ5NTA2Nzo2NUBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiLimJzimaHimJ4g6pyx4bSc4bSYyoDhtIfhtI3htIcg4bSEypzhtIDqnLHhtJjhtIfKgCDimJzimaHimJ4ifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0l5am05NEZFTE9rbUwwR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IittUFdXbDdHSmhQRHBKUEdnQzJTMUV3a0dRSDAzalMxZmFHcnBmNW5DMVk9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjFoMXVMRm5YY3RIRkY5RnB3ZzI2cHEzMGZRN3p1WkFaanJDcVhzWlQyUHprNkUxUlhkZm01V3Y0cHZzbVZqblQyL1VKQm1PaHYrNEdLRTZMc0J2MEJRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiI3YTFPS3V5QU1sYWVYdXlVUUpMREYzNS9PZWFqYXJNOUx0WEVOZVY0YjBsMDlNN0dxeUI1NFczYUtzbjNBa0I3blpRdG1EdXZ0N1duTFpaYnNxZ2lqdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI2MzcxOTQ5NTA2Nzo2NUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJmcGoxbHBleGlZVHc2U1R4b0F0a3RSTUpCa0I5TjQwdFgyaHE2WCtad3RXIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzM4OTM2ODk3LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUpwNCJ9',
    PREFIXE: process.env.PREFIX || "+",
    GITHUB : process.env.GITHUB|| 'https://github.com/Fred1e/LUCKY_MD',
    OWNER_NAME : process.env.OWNER_NAME || "Fredi",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "263719495067",  
              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT: process.env.AUTO_REACTION || "non",  
     AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'yes',
    URL: process.env.URL || "https://files.catbox.moe/7irwqn.jpeg",  
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || 'non',              
    CHAT_BOT: process.env.CHAT_BOT || "off",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_HANDLE || 'no', 
    AUTO_REPLY : process.env.AUTO_REPLY || "no", 
    AUTO_STATUS_TEXT: process.env.AUTO_STATUS_TEXT || 'viewed by alpha md',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    AUTO_BIO: process.env.AUTO_BIO || 'yes',       
    ANTI_CALL_TEXT : process.env.ANTI_CALL_TEXT || '',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VaihcQv84Om8LP59fO3f",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VaihcQv84Om8LP59fO3f",
    CAPTION : process.env.CAPTION || "✧⁠LUCKY_MD✧",
    BOT : process.env.BOT_NAME || '✧⁠LUCKY_MD✧⁠',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Dodoma", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '1',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTI_DELETE_MESSAGE : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTI_CALL: process.env.ANTI_CALL || 'yes', 
    AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',             
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

