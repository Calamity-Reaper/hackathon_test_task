import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';

export default class ParseJsonPipe implements PipeTransform<string, Record<string, any>> {
  transform(value: string, metadata: ArgumentMetadata): Record<string, any> {
    const property = metadata.data;

    try {
      return JSON.parse(value);
    } catch (e) {
      throw new BadRequestException(`${property} contains invalid JSON`);
    }
  }
}
