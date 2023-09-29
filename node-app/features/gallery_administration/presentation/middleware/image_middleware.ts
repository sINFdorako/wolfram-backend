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
