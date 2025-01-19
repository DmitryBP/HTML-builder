const fs = require('fs');
const path = require('path');
const { stdin } = process;

const writeStream = fs.createWriteStream(path.join(__dirname, 'text.txt'));

console.log('Enter the data to write to the file (type "exit" to finish):');

stdin.on('data', (chunk) => {
  const input = chunk.toString().trim();

  if (input === 'exit') {
    console.log('Exiting and closing the file.');
    process.exit();
  }

  writeStream.write(input + '\n', (err) => {
    if (err) {
      console.error('Error writing to file: ' + err);
    } else {
      console.log('Data added to file.');
    }
  });
});
