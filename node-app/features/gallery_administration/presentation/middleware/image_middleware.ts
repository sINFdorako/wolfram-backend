import multer from 'multer';
import path from 'path';
import { UPLOADS_PATH } from '../../../../main';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_PATH);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Benennen Sie die Datei um
  }
});

export const upload = multer({ storage: storage });
