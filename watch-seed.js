const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');

const seedFile = path.join(__dirname, 'seed.js');
let isSeeding = false;
let watchTimeout = null;

console.log(`👀 Watching ${seedFile} for changes...`);

fs.watch(seedFile, (eventType) => {
  if (eventType === 'change') {
    if (watchTimeout) clearTimeout(watchTimeout);
    
    watchTimeout = setTimeout(() => {
      if (isSeeding) return;
      
      isSeeding = true;
      console.log('Detected change in seed.js. Re-seeding database...');
      
      exec('node seed.js', (error, stdout, stderr) => {
        isSeeding = false;
        if (error) {
          console.error(`Error during seeding: ${error.message}`);
          return;
        }
        console.log(stdout);
        console.log('✅ Database synchronized successfully.');
      });
    }, 300);
  }
});
