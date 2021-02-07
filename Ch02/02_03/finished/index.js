const fs = require("fs");

const readStream = fs.createReadStream("./powder-day.mp4");

readStream.on("data", (chunk) => {
  console.log("size: ", chunk.length);
});

readStream.on("end", () => {
  console.log("read stream finished");
});

readStream.on("error", (error) => {
  console.log("an error has occured.");
  console.error(error);
});

// to convert to non-flowing
readStream.pause();

// a non-flowing stream. You have to ask for data to push to the stream
process.stdin.on("data", (chunk) => {
  if (chunk.toString().trim() === "finish") {
    // back to flowing mode
    readStream.resume();
  }

  // to read data from a non-flowing stream
  readStream.read();
});
