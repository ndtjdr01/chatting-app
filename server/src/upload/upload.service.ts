import { Injectable } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Injectable()
export class UploadService {
  static getMulterConfig() {
    return {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = Date.now() + extname(file.originalname);
          cb(null, randomName);
        },
      }),
    };
  }
}
