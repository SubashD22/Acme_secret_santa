import { EventEmitter } from 'events';
import * as fs from 'fs';
import * as path from 'path';

export class FileMonitorService extends EventEmitter {
  private pollInterval: NodeJS.Timeout | null = null;
  private readonly employeeFileName = 'Employee-List';
  private readonly previousListFileName = 'Secret-Santa-Game-Result';
  private readonly pollTime = 5000; // 5 seconds

  constructor(private readonly dropPath: string = path.join(__dirname, '..', 'drop')) {
    super();
  }

  startMonitoring(): void {
    console.log(`Monitoring for files in drop folder... \nDrop files ${this.employeeFileName} and ${this.previousListFileName} in the drop folder \nctrl + c to stop`);
    this.pollInterval = setInterval(() => this.lookForFiles(), this.pollTime);
  }

  stopMonitoring(): void {
    if (this.pollInterval) {
      clearInterval(this.pollInterval);
      this.pollInterval = null;
    }
  }

  private lookForFiles(): void {
    fs.readdir(this.dropPath, (err: NodeJS.ErrnoException | null, files: string[]) => {
      if (err) {
        this.emit('error', err);
        return;
      }
      const employeeFiles = files.filter(file =>
        file.startsWith(this.employeeFileName) && file.endsWith('.xlsx')
      );

      const previousListFiles = files.filter(file =>
        file.startsWith(this.previousListFileName) && file.endsWith('.xlsx')
      );

      if (employeeFiles.length > 1) {
        console.log(employeeFiles);
        throw new Error('Multiple employee list files found in drop folder. Please ensure only one employee list file exists before running the program again.');
      }

      if (previousListFiles.length > 1) {
        throw new Error('Multiple previous list files found in drop folder. Please ensure only one previous list file exists before running the program again.');
      }

      const employeeFile = employeeFiles[0];
      const previousListFile = previousListFiles[0];

      if (employeeFile && previousListFile) {
        this.emit('filesFound', {
          employeeFile: path.join(this.dropPath, employeeFile),
          previousListFile: path.join(this.dropPath, previousListFile)
        });
      }
    });
  }
}
