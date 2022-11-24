import { v4 as uuidv4 } from 'uuid';

const publicPath = './public';
const path = publicPath;

export class FileLoadHelper {
  static set path(path: string) {
    path = publicPath + path;
  }

  public static uniqueFileName(
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, filename: string) => void,
  ) {
    const ext = file.originalname.split('.').at(-1);

    callback(null, `${uuidv4()}.${ext}`);
  }

  public static destinationPath(
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, filename: string) => void,
  ) {
    callback(null, path);
  }
}
