const fs = require('fs');

function validateFilePath(filePath) {
  if (typeof filePath !== 'string') {
    throw new Error('filePath must be a string');
  }

  fs.accessSync(filePath, fs.constants.R_OK);
}

function importFileHandler(filePath) {
  validateFilePath(filePath);
  return fs.createReadStream(filePath);
}

module.exports = importFileHandler;
