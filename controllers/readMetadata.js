import distExiftool from 'dist-exiftool';
import exiftool from 'node-exiftool';
import fs from 'fs';
import path from 'path';
const __dirname = path.resolve();

const readFolder = async (directory) => {
  try {
    const tempPath = directory; /*path.join(__dirname, '/public/upload/', directory);*/
    console.log(tempPath);
    const rs = fs.createReadStream(tempPath);
    if (!rs) {
      return console.log('Unable to read Folder');
    }
    const ep = new exiftool.ExiftoolProcess(distExiftool);
    ep.open()
      .then(() => ep.readMetadata(tempPath, ['-ext "*"', '-r', '-a', '-u', '-g1']))
      .then((res) => {
        console.log(res);
      })
      .then(() => ep.close())
      .catch(console.error);
  } catch (error) {
    console.log(`There's an error, Cannot Read File${error}`);
  }
};

const thePath = 'C:\\Users\\USER\\works\\extractMetadata\\public\\upload\\Folder\\TECHATHON-1.0-NODEJS-week_2\\week_2\\auth.js'
readFolder(thePath);