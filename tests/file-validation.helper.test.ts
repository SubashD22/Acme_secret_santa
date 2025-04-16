import { validateFile } from "../helpers/file_validation.helper";

describe('validateFile', () => {
  it('should return true if the employee file is valid', () => {
    const result = validateFile([{ Employee_Name: 'John Doe', Employee_EmailID: 'john.doe@example.com' }], 'employee');
    expect(result).toBe(true);
  });
  it('should return true if the previous list file is valid', () => {
    const result = validateFile([{ Employee_Name: 'John Doe', Employee_EmailID: 'john.doe@example.com', Secret_Child_Name: 'Jane Doe', Secret_Child_EmailID: 'jane.doe@example.com' }], 'previousList');
    expect(result).toBe(true);
  });
  it('should return false if the employee file is invalid', () => {
    const result = validateFile([{ Employee_Name: 'John Doe', Employee_EmailID: '' }], 'employee');
    expect(result).toBe(false);
  });
  it('should return false if the previous list file is invalid', () => {
    const result = validateFile([{ Employee_Name: 'John Doe', Employee_EmailID: 'john.doe@example.com' }], 'previousList');
    expect(result).toBe(false);
  });
});
