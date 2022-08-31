import distExiftool from 'dist-exiftool';
import exiftool from 'node-exiftool';
import fs from 'fs';
import path from 'path';
const __dirname = path.resolve();

const readFile = async (filename) => {
  try {
    const tempPath = path.join(__dirname, '/public/upload/', filename);
    console.log(tempPath);
    const rs = fs.createReadStream(tempPath);
    if (!rs) {
      return console.log('Unable to read file');
    }
    const ep = new exiftool.ExiftoolProcess(distExiftool);
    ep.open()
      .then(() => ep.readMetadata(tempPath, ['-a', '-u', '-g1']))
      .then((res) => {
        console.log(res);
      })
      .then(() => ep.close())
      .catch(console.error);
  } catch (error) {
    console.log(`There's an error ${error}`);
  }
};


readFile('note_manager.zip');