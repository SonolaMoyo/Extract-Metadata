import distExiftool from 'dist-exiftool';
import exiftool from 'node-exiftool';
import fs from 'fs';
import path from 'path';
const __dirname = path.resolve();

const writeFolder = async (directory) => {
  try {
    const tempPath = directory; /*path.join(__dirname, '/public/upload', directory);*/
    console.log(tempPath);
    const rs = fs.createReadStream(tempPath);
    if (!rs) {
      return console.log('Unable to read Folder');
    }
    const ep = new exiftool.ExiftoolProcess(distExiftool);
    ep.open()
      .then(() =>
        ep.writeMetadata(
          tempPath,
          {
            all: '',
            comment: 'edited by @name'
          },
          ['overwrite_original', '-ext "*"', 'r', 'z']
        )
      )
      .then(console.log, console.error)
      .then(() => ep.close())
      .catch(console.error);
  } catch (error) {
    console.log(`There's error, Cannot writeFiles ${error}`);
  }
};

// const thePath = 'note_manager.zip'
// writeFolder(thePath);


//export writeMetadata function
export default {writeFolder}
