import { v4 as uuidv4 } from 'uuid';
import { Request } from 'express';

const publicPath = './public';
const path = publicPath;

export class FileLoadHelper {
  public static uniqueFileName(
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, destination: string) => void,
  ) {
    const ext = file.originalname.split('.').at(-1);

    callback(null, `${uuidv4()}.${ext}`);
  }

  public static destinationPath(
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, destination: string) => void,
  ) {
    callback(null, path);
  }
}
