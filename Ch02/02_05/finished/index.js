const { createReadStream, createWriteStream } = require("fs");

//Back presuure - pausing write stream until it's capable of holding more data

const readStream = createReadStream("../../powder-day.mp4");
// yu can set up a highWaterMark to allow for a larger hose
const writeStream = createWriteStream("./copy.mp4", {
  //highWaterMark: 1628920128
});

readStream.on("data", (chunk) => {
  // the result tells whether the stream can hold more data
  // that is, if its full or not
  const result = writeStream.write(chunk);
  if (!result) {
    console.log("backpressure");
    readStream.pause();
  }
});

readStream.on("error", (error) => {
  console.log("an error occurred", error.message);
});

readStream.on("end", () => {
  writeStream.end();
});

writeStream.on("drain", () => {
  // continue reading once the stream is drained
  console.log("drained");
  readStream.resume();
});

writeStream.on("close", () => {
  process.stdout.write("file copied\n");
});
