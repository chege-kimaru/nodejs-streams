const { createReadStream, createWriteStream } = require("fs");

// you can pipe read stream to write stream instead of doing as in chapter 5.
// It handles everything including back presuure etc
// const rs = createReadStream("../../powder-day.mp4");
// const ws = createWriteStream("./copy.mp4");
// rs.pipe(ws);

const writeStream = createWriteStream("./file.txt");

process.stdin.pipe(writeStream);
