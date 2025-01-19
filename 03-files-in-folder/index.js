const fs = require('fs');
const path = require('path');

const directory = path.join(__dirname, 'secret-folder');

fs.readdir(directory, (err, files) => {
  if (err) {
    console.log('Error reading: ' + err.message);
  }

  console.log('Directory contents: ');
  files.forEach((file) => {
    const filePath = path.join(directory, file);

    fs.stat(filePath, (err, stat) => {
      if (err) {
        console.log('Error: cant get file size');
      }
      if (stat.isFile()) {
        console.log(
          file.replace('.', '-') + '-' + (stat.size / 1024).toFixed(2) + 'kb',
        );
      }
    });
  });
});
