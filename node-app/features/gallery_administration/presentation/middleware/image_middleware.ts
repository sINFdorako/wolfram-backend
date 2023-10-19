import multer from 'multer';
import path from 'path';
import { UPLOADS_PATH } from '../../../../main';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_PATH);
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Renaming the file
  }
});

const uploadLimit = 100 * 1024 * 1024;  // 100 MB

export const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: uploadLimit
  }
});

export const multerErrorHandler = (err: any, req: any, res: any, next: any) => {
  if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).send({ message: 'Die Dateigröße überschreitet das Limit.' });
  }
  next(err);
};
