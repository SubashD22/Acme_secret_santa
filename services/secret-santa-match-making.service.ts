import { Employee, PreviousList } from "../helpers/interface.helpers";

export class SecretSantaMatchMakingService {
  private employeeData: Employee[];
  private previousListHashMap: Map<string, string>;
  private newMatchList: PreviousList[];
  private tempList: Employee[];
  private attempts = 0;
  constructor(employeeData: Employee[], previousListHashMap: Map<string, string>) {
    this.employeeData = employeeData;
    this.previousListHashMap = previousListHashMap;
    this.newMatchList = [];
    this.tempList = Array.from(JSON.parse(JSON.stringify(employeeData)));
  }
  async matchEmployees(): Promise<PreviousList[]> {
    const maxAttempts = 50;
    let validMatch = false;
    while (!validMatch && this.attempts < maxAttempts) {
      for (let i = this.employeeData.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.tempList[i], this.tempList[j]] = [this.tempList[j], this.tempList[i]];
      }
      for (let i = 0; i < this.employeeData.length; i++) {
        const giver = this.employeeData[i];
        const receiver = this.tempList[i];
        if (giver.Employee_EmailID === receiver.Employee_EmailID || receiver.Employee_EmailID === this.previousListHashMap.get(giver.Employee_EmailID)) {
          validMatch = false;
          this.attempts++;
          break;
        }
        validMatch = true;
      }
    }
    if (this.attempts >= maxAttempts || !validMatch) {
      throw new Error('Failed to match employees after 20 attempts \n\nPlease check your files and try again');
    }
    this.newMatchList = this.employeeData.map((employee, index) => ({
      ...employee,
      Secret_Child_Name: this.tempList[index].Employee_Name,
      Secret_Child_EmailID: this.tempList[index].Employee_EmailID
    }));
    return this.newMatchList;
  }
} 