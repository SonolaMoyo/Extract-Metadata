import distExiftool from 'dist-exiftool';
import exiftool from 'node-exiftool';
import fs from 'fs';
import path from 'path';
import DataModel from '../model/main.model.js';

createMetaData = async (req, res, next) => {
  try {
    if (!req.file) {
      return res
        .status(404)
        .json({ status: 'failed', msg: 'file not found, upload one' });
    }
    const tempPath = path.join(
      __dirname,
      '../public/upload/',
      req.file.filename
    );
    const rs = await fs.createReadStream(tempPath);
    const ep = new exiftool.ExiftoolProcess(distExiftool);
    ep.open()
      .then(() => ep.readMetadata(rs, ['-File:all']))
      .then(async (result) => {
        let metadata = new DataModel({
          fileName: req.file.filename,
          originalName: req.file.originalname,
          size: req.file.size,
          information: result.data[0],
        });
        metadata = await metadata.save();
        return res.status(200).json({ metadata });
      })
      .then(
        () => ep.close(),
        () => ep.close()
      )
      .catch(console.error);
  } catch (error) {
    next(error);
  }
};

export default { createMetaData };
