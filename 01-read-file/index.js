const fs = require('fs');
const path = require('path');

const readStrim = fs.createReadStream(
  path.join(__dirname, 'text.txt'),
  'utf-8',
);
let data = '';
readStrim.on('data', (chunk) => (data += chunk));
readStrim.on('end', () => console.log('End', data));
readStrim.on('error', (err) => console.log('Error', err.message));
