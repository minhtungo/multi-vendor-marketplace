import { Readable } from 'node:stream';
import csvParser from 'csv-parser';

export const parseCsvFromBuffer = (buffer: Buffer): Promise<Record<string, string>[]> => {
  return new Promise((resolve, reject) => {
    const results: Record<string, string>[] = [];
    const stream = Readable.from(buffer.toString());

    stream
      .pipe(csvParser())
      .on('data', (data: Record<string, string>) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error: Error) => reject(error));
  });
};
