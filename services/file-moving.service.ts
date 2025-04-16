import * as fs from 'fs';
import * as path from 'path';

export class FileMovementService {
  constructor(
    private readonly dropPath: string = path.join(__dirname, '..', 'drop'),
    private readonly processedPath: string = path.join(__dirname, '..', 'processed')
  ) { }

  async moveToProcessed(employeeFilePath: string, previousListFilePath: string): Promise<void> {
    try {
      // Get just the filenames without the full path
      const employeeFileName = path.basename(employeeFilePath);
      const previousListFileName = path.basename(previousListFilePath);

      // Move employee file
      await this.moveFile(
        employeeFilePath,
        path.join(this.processedPath, employeeFileName)
      );

      // Move previous list file
      await this.moveFile(
        previousListFilePath,
        path.join(this.processedPath, previousListFileName)
      );
    } catch (error) {
      throw new Error(`Error moving files: \n\n${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private async moveFile(sourcePath: string, destinationPath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.rename(sourcePath, destinationPath, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}
