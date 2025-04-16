const xlsx = require('xlsx');

export const parseFile = (file: string) => {
  try {
    const workbook = xlsx.readFile(file);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);
    return data;
  } catch (error) {
    console.error("Error parsing employee file:", error);
    return null;
  }
}