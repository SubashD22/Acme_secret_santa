import { FileMonitorService } from "./services/file-monitor.service";
import { FileProcessingService } from "./services/file-processing.service";
import { FileMovementService } from "./services/file-moving.service";
import { SecretSantaMatchMakingService } from "./services/secret-santa-match-making.service";
import { FileCreateResultsService } from "./services/file-create-results.service";
import { PreviousList } from "./helpers/interface.helpers";
const fileMonitor = new FileMonitorService();
const fileProcessor = new FileProcessingService();
const fileMovement = new FileMovementService();

fileMonitor.on('filesFound', async ({ employeeFile, previousListFile }) => {
  try {
    //stop monitoring
    fileMonitor.stopMonitoring();
    // Process the files
    let { employeeData, previousListHashMap } = await fileProcessor.processFiles(employeeFile, previousListFile);
    let matchList: PreviousList[] = await new SecretSantaMatchMakingService(employeeData, previousListHashMap).matchEmployees();
    await new FileCreateResultsService(matchList).createResultsFile();
    // Move the files to processed directory
    await fileMovement.moveToProcessed(employeeFile, previousListFile);
    console.log('Files processed and moved successfully, results file created and saved in result folder');
  } catch (error) {
    console.error('Error in file processing workflow: \n', error);
    fileMonitor.stopMonitoring();
  } finally {
    // Ask user if they want to continue monitoring
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });

    readline.question('Would you like to continue monitoring? (y/n): ', (answer: string) => {
      if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
        fileMonitor.startMonitoring();
      } else {
        console.log('Stopping file monitoring. To restart, run "npm start"');
        process.kill(process.pid, 'SIGINT');
      }
      readline.close();
    });
  }
});

fileMonitor.on('error', (error) => {
  console.error('Error monitoring files:', error);
});

fileMonitor.startMonitoring();
