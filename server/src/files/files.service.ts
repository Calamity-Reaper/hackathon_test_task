import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { AppConfigService } from '../app-config/app-config.service';
import { v4 } from 'uuid';
import { extension } from 'mime-types';
import { unlink, writeFile } from 'fs/promises';
import { join } from 'path';

@Injectable()
export class FilesService {
  constructor(private config: AppConfigService) {}

  async save(file: Express.Multer.File) {
    const filename = v4() + '.' + extension(file.mimetype);

    try {
      await writeFile(join(this.config.SERVE_STATIC_PATH, filename), file.buffer);
      return filename;
    } catch (e) {
      Logger.error(e.message, `${FilesService.name} - save`);
      throw new InternalServerErrorException(e.message);
    }
  }

  async delete(filename: string) {
    try {
      await unlink(join(this.config.SERVE_STATIC_PATH, filename));
    } catch (e) {
      Logger.error(e.message, `${FilesService.name} - delete`);
      throw new InternalServerErrorException(e.message);
    }
  }
}
