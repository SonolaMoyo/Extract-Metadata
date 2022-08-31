import distExiftool from 'dist-exiftool';
import exiftool from 'node-exiftool';
import fs from 'fs';
import path from 'path';
const __dirname = path.resolve();

const readFolder = async (directory) => {
  try {
    const tempPath = path.join(__dirname, '/public/upload/', directory);
    console.log(tempPath);
    const ep = new exiftool.ExiftoolProcess(distExiftool);
    ep.open()
      .then(() => ep.readMetadata(tempPath, ['-ext "*"', '-r', '-a', '-u', '-g1']))
      .then((res) => {
        console.log(res);
      })
      .then(() => ep.close())
      .catch(console.error);
  } catch (error) {
    console.log(`There's an error ${error}`);
  }
};


readFolder('');