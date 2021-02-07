// Duplex streams implement both wriatable and readable
// They represent the middle part of a pipeline
// They can be piped between readable and writable streams ie
// it can receive data from a read stream and send that data to a write stream
// Good for creating pipelines
// Eg the report pipeline below creates a report
// The throttle pipeline delays the writing by 10ms

const { Duplex, PassThrough } = require("stream");
const { createReadStream, createWriteStream } = require("fs");

const readStream = createReadStream("../../powder-day.mp4");
const writeStream = createWriteStream("./copy.mp4");

class Throttle extends Duplex {
  constructor(ms) {
    super();
    this.delay = ms;
  }

  _write(chunk, encoding, callback) {
    this.push(chunk);
    setTimeout(callback, this.delay);
  }

  _read() {}

  _final() {
    this.push(null);
  }
}

const report = new PassThrough();
const throttle = new Throttle(100);

var total = 0;
report.on("data", (chunk) => {
  total += chunk.length;
  console.log("bytes: ", total);
});

readStream.pipe(throttle).pipe(report).pipe(writeStream);
