const { Readable } = require("stream");

const peaks = [
  "Tallac",
  "Ralston",
  "Rubicon",
  "Twin Peaks",
  "Castle Peak",
  "Rose",
  "Freel Peak",
];

class StreamFromArray extends Readable {
  constructor(array) {
    // default is binary mode
    // super();
    // utf 8 eg the words in the array above
    // super({ encoding: "utf-8" });
    // if the chunk is an object as below in the _read function
    super({ objectMode: true });
    this.array = array;
    this.index = 0;
  }

  _read() {
    if (this.index <= this.array.length) {
      // const chunk = this.array[this.index];
      const chunk = {
        data: this.array[this.index],
        index: this.index,
      };
      this.push(chunk);
      this.index += 1;
    } else {
      this.push(null);
    }
  }
}

const peakStream = new StreamFromArray(peaks);

peakStream.on("data", (chunk) => console.log(chunk));

peakStream.on("end", () => console.log("done!"));
