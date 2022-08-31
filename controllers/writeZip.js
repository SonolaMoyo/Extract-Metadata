import Meta from './writeMetadata.js';
import zip from 'cross-zip';
import path from 'path';
import fs from 'fs';
const __dirname = path.resolve();

const zipFile = async (inPathZip, outPathZip) => {
  //To Zip a Folder
  // const inPathZip = path.join(__dirname, '/public/upload/', 'note_manager');
  // const outPathZip = path.join(__dirname, '/public/upload/', 'note_manager2.zip');

  try {
    zip.zip(inPathZip, outPathZip);
  } catch (error) {
    if (error) {
      console.log(`There's an error zipping the file ${error}`);
    } else {
      console.log(`Zip successful`);
    }
  }
};

const unzipFile = async (inPathUnzip, outPathUnzip) => {
  //To Unzip a Folder
  //const inPathUnzip = path.join(__dirname, '/public/upload/', 'note_manager2.zip');
  //const outPathUnzip = path.join(__dirname, '/public/upload/', 'note_manager');

  try {
    zip.unzip(inPathUnzip, outPathUnzip);
  } catch (error) {
    if (error) {
      console.log(`There's an error when Unzipping a file${err}`);
    } else {
      console.log(`Unzip successful`);
    }
  }
};

const deleteFile = (inPathZip) => {
  //delete file/folder and contents inside
  fs.rmdirSync(inPathZip, { recursive: true }, (err) => {
    if (err) {
      console.log(err);
    }
  });
};

const writeZipMetadata = async (inZipPath, outZipPath) => {
  const sampleLoc = 'C:\\Users\\USER\\works\\extractMetadata\\public\\upload';
  try {
    //delete file after processing
    deleteFile(`${sampleLoc}\\Folder`);
    //create folder
    const dir = sampleLoc+'//Folder'
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {
            recursive: true
        });
    }
    //unzip the file
    unzipFile(inZipPath, `${sampleLoc}\\Folder`);

    //metadata processing
    Meta.writeFolder(`${sampleLoc}\\Folder`)

    //zip the processed file
    zipFile(`${sampleLoc}\\Folder`, outZipPath);
  } catch (error) {
    console.log(`There an error, Cannot write Zip metadata ${error}`);
  }
};

const inZipPath = 'C:\\Users\\USER\\works\\extractMetadata\\public\\upload\\baaymax.zip'
const outZipPath = 'C:\\Users\\USER\\works\\extractMetadata\\public\\upload\\baaymax2.zip'
writeZipMetadata( inZipPath, outZipPath);
