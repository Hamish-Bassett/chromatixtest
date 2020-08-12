const fs = require('fs');

function writeOutput(fileContents, filename) {
  const fileString = JSON.stringify(fileContents);
  fs.writeFile(filename, fileString, 'utf-8', (err) => {
    console.log(err);
  });
}

module.exports = writeOutput;
