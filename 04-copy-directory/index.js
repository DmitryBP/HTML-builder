const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {
  if (err) {
    console.log('error: ' + err.message);
  }
  console.log('directiry maked');
});

fs.readdir(path.join(__dirname, 'files'), (err, files) => {
  files.forEach((file) => {
    const sorseFilPath = path.join(__dirname, 'files', file);
    const copiedFilePath = path.join(__dirname, 'files-copy', file);
    fs.copyFile(sorseFilPath, copiedFilePath, (err) => {
      if (err) {
        console.log('Error: ' + err.message);
      }
    });
  });
});
