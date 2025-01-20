const fs = require('fs');
const path = require('path');

const allStyles = [];
const writeStream = fs.createWriteStream(
  path.join(__dirname, 'project-dist', 'bundle.css'),
);

fs.readdir(path.join(__dirname, 'styles'), (err, files) => {
  if (err) {
    return console.log('error read directory: ' + err);
  }

  let readedFilesCount = 0;
  const totalFilesCount = files.length;

  files.forEach((file) => {
    if (path.extname(file) === '.css') {
      fs.readFile(
        path.join(__dirname, 'styles', file),
        'utf-8',
        (err, data) => {
          if (err) {
            console.log('error read file: ' + err);
            readedFilesCount++;
          } else {
            allStyles.push(data);
            readedFilesCount++;
          }

          if (readedFilesCount === totalFilesCount) {
            writeStream.write(allStyles.join('\n'), (err) => {
              if (err) {
                return console.log('error write file: ' + err);
              }
            });
          }
        },
      );
    } else {
      readedFilesCount++;
    }
  });
});
