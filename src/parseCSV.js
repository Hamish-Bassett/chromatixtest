const stream = require('stream');
const csv = require('fast-csv');
const EventEmitter = require('events');

class CSVParser extends EventEmitter {
  parseCSV(readStream) {
    if (!(readStream instanceof stream.Readable)) {
      throw new Error('readStream must be a ReadStream');
    }
    readStream
      .setEncoding('utf-8')
      .pipe(csv.parse({ headers: true }))
      .on('error', (err) => {
        this.emit('error', err);
      })
      .on('data', (data) => this.emit('data', data))
      .on('end', () => this.emit('end'));
  }
}

module.exports = CSVParser;
