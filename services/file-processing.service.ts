import { parseFile } from '../helpers/data_parser.helper';
import { validateFile } from '../helpers/file_validation.helper';
import { Employee, PreviousList } from '../helpers/interface.helpers';

export class FileProcessingService {
  async processFiles(employeeFilePath: string, previousListFilePath: string): Promise<{
    employeeData: Employee[];
    previousListHashMap: Map<string, string>;
  }> {
    try {
      // Parse both files
      const employeeData: Employee[] = await parseFile(employeeFilePath);
      const previousListData: PreviousList[] = await parseFile(previousListFilePath);
      // Validate both files
      if (!validateFile(employeeData, 'employee') || !validateFile(previousListData, 'previousList')) {
        throw new Error('Invalid file format - files must match expected schema \n\nEmployee file must have Employee_Name and Employee_EmailID columns\n\nPrevious List file must have Employee_Name, Employee_EmailID, Secret_Child_Name, and Secret_Child_EmailID columns');
      }
      const previousListHashMap = new Map<string, string>();
      previousListData.forEach(item => {
        previousListHashMap.set(item.Employee_EmailID, item.Secret_Child_EmailID);
      });
      return {
        employeeData,
        previousListHashMap
      };
    } catch (error) {
      throw new Error(`Error processing files: \n\n${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}
