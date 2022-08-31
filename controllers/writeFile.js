import distExiftool from 'dist-exiftool';
import exiftool from 'node-exiftool';
import fs from 'fs';
import path from 'path';
const __dirname = path.resolve();

const writeFile = async (filename) => {
  try {
    const tempPath = path.join(__dirname, '/public/upload/', filename);
    console.log(tempPath);
    const rs = fs.createReadStream(tempPath);
    if (!rs) {
      console.log('Unable to read file');
    }
    const ep = new exiftool.ExiftoolProcess(distExiftool);
    ep.open()
      .then(() =>
        ep.writeMetadata(
          tempPath,
          {
            all: '',
            comment: 'edited by @'
          },
          ['overwrite_original']
        )
      )
      .then(console.log, console.error)
      .then(() => ep.close())
      .catch(console.error);
  } catch (error) {
    console.log(`There's error ${error}`);
  }
};

writeFile('image1.jpg');
