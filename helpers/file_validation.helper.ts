import { PreviousList, Employee } from "./interface.helpers";

export const validateFile = (data: Employee[] | PreviousList[], type: 'employee' | 'previousList') => {
  let valid = true;
  for (const item of data) {
    if (type === 'employee' && (!item.Employee_Name || !item.Employee_EmailID)) {
      valid = false;
      break;
    }
    if (type === 'previousList' && (!item.Employee_Name || !item.Employee_EmailID || !('Secret_Child_EmailID' in item) || !('Secret_Child_Name' in item))) {
      valid = false;
      break;
    }
  }
  return valid;
};

