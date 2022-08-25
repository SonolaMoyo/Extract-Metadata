import multer from 'multer';
import path from 'path';
const __dirname = path.resolve()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '/public/upload/'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix +'-' +file.originalname);
  },
});

const upload = multer({ storage: storage }).single('file');

const uploadFile = (req, res, next) => {
  try {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ msg: `Unable to upload file, ${err}` });
      } else if (err) {
        return res
          .status(400)
          .json({ status: 'failed', msg: 'Error(not multer)', error: err });
      }
      next();
    });
  } catch (error) {
    next(error);
  }
};

export default { uploadFile };
