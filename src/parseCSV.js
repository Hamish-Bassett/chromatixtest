const stream = require('stream');
const csv = require('fast-csv');
const EventEmitter = require('events');

class CSVParser extends EventEmitter {
  /**
   * by making the stream a variable we can inject what ever we need. We can easily plumb in a
   * network sourced stream.
   */
  // network base
  parseCSV(readStream) {
    if (!(readStream instanceof stream.Readable)) {
      throw new Error('readStream must be a ReadStream');
    }
    // we want to do minimal processing here and allow hooks for the calling closures to latch into
    // so we can easily extend behaviour.
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
