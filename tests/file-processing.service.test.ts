import { FileProcessingService } from "../services/file-processing.service";
import path from 'path';

describe('FileProcessingService', () => {
  it('should throw an error if the files are not valid', async () => {
    const fileProcessingService = new FileProcessingService();
    await expect(async () => {
      await fileProcessingService.processFiles('test/employee.xlsx', 'test/previous_list.xlsx');
    }).rejects.toThrow();
  });
  it('should return the correct data if the files are valid', async () => {
    const fileProcessingService = new FileProcessingService();
    const result = await fileProcessingService.processFiles(path.join(__dirname, '..', 'tests', 'Employee-List-test.xlsx'),
      path.join(__dirname, '..', 'tests', 'Secret-Santa-Game-Result-Test.xlsx'));
    expect(result).toBeDefined();
  });
});