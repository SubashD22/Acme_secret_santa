import { SecretSantaMatchMakingService } from "../services/secret-santa-match-making.service";
import { testEmployeeList, testPreviousListHashMap, noMatchTestList, noMatchTestHashMap } from "../helpers/test.helper";
import { PreviousList } from "../helpers/interface.helpers";

describe('SecretSantaMatchMakingService', () => {
  let result: PreviousList[];
  it('matching employees should be successful ', async () => {
    const secretSantaMatchMakingService = new SecretSantaMatchMakingService(testEmployeeList, testPreviousListHashMap);
    result = await secretSantaMatchMakingService.matchEmployees();
    expect(result).toBeDefined()
  });
  it('result should be the same length as the employee list', async () => {
    expect(result.length).toBe(testEmployeeList.length);
  });
  it('result should have both secret child and santa child email id', async () => {
    expect(result.every(employee => employee.Secret_Child_EmailID && employee.Secret_Child_Name)).toBe(true);
  });
  it('result employee should not be matched with themselves', async () => {
    expect(result.every(employee => employee.Employee_EmailID !== employee.Secret_Child_EmailID)).toBe(true);
  });
  it('result employee should not be matched with the previous match', async () => {
    expect(result.every(employee => testPreviousListHashMap.get(employee.Employee_EmailID) !== employee.Secret_Child_EmailID)).toBe(true);
  });
  it('should throw error if no possible match could be made', async () => {
    const secretSantaMatchMakingService = new SecretSantaMatchMakingService(noMatchTestList, noMatchTestHashMap);
    await expect(secretSantaMatchMakingService.matchEmployees()).rejects.toThrow();
  });
});
