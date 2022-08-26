import distExiftool from 'dist-exiftool';
import exiftool from 'node-exiftool';
import fs from 'fs';
import path from 'path';
import { DataModel } from '../model/main.model.js';
const __dirname = path.resolve();

const createMetaData = async (req, res, next) => {
  try {
    if (!req.file) {
      return res
        .status(404)
        .json({ status: 'failed', msg: 'file not found, upload one' });
    }
    const tempPath = path.join(__dirname, '/public/upload/', req.file.filename);
    console.log(tempPath);
    const rs = fs.createReadStream(tempPath);
    const ep = new exiftool.ExiftoolProcess(distExiftool);
    ep.open()
      .then(() => ep.readMetadata(rs, ['-File:all']))
      .then((res) => {
        console.log(res)
      })
      .then(
        () => ep.close()
      )
      .catch(console.error);
      
      return res.status(200).json({status: "success"});
    // ep.open()
    //   .then(() => ep.readMetadata(rs, ['-File:all']))
    //   .then(async (result) => {
    //     let metadata = new DataModel({
    //       fileName: req.file.filename,
    //       originalName: req.file.originalname,
    //       size: req.file.size,
    //       information: result.data,
    //     });
    //     metadata = await metadata.save();
    //     return res.status(200).json({ metadata });
    //   })
    //   .then(
    //     () => ep.close(),
    //     () => ep.close()
    //   )
    //   .catch(console.error);
  } catch (error) {
    next(error);
  }
};

const getMetaData = async (req, res, next) => {
  try {
    const id = req.params.id;
    const metadata = DataModel.findOne({ id });
    return res.status(200).json({ status: 'success', metadata });
  } catch (error) {
    next(error);
  }
};

const writeMetaData = async (req, res, next) => {
  try {
    // if (!req.file) {
    //   return res
    //     .status(404)
    //     .json({ status: 'failed', msg: 'file not found, upload one' });
    // }
    // const tempPath = path.join(
    //   __dirname,
    //   '/public/upload/file-exif-crimes_against_women_2001-2014.csv'
    // );
    // // const rs = fs.createReadStream(tempPath);
    // const data = {
    //   all: ''
    // };
    // const ep = new exiftool.ExiftoolProcess(/*distExiftool*/);
    // ep.open()
    //   .then(() => {
    //     const editedData = ep.writeMetadata(tempPath, data, [
    //       'overwrite_original',
    //     ])
    //     console.log(editedData);
    //   })
    //   .then(() => ep.close())
    //   .catch(console.error);
    // return res.status(200).json({ fileLocation: tempPath });
    if (!req.file) {
      return res
        .status(404)
        .json({ status: 'failed', msg: 'file not found, upload one' });
    }
    const tempPath = path.join(__dirname, '/public/upload/', req.file.filename);
    console.log(tempPath);
    const rs = fs.createReadStream(tempPath);
    const ep = new exiftool.ExiftoolProcess();
    ep.open()
      .then(() => ep.readMetadata(rs, ['n', '-File:all']))
      .then((res) => 
        ep.writeMetadata(
          res.data[0].SourceFile,
          {
            "MWG:Megapixels": "another"
          },
          ['overwrite_original']
        )
      )
      .then(console.log, console.error)
      .then(() => ep.close())
      .catch(console.error);
  return res.status(200).json({status: "success"});
  } catch (error) {
    next(error);
  }
};

export default { createMetaData, getMetaData, writeMetaData };
