import { PreviousList } from "../helpers/interface.helpers";
import path from 'path';
import xlsx from 'xlsx';

export class FileCreateResultsService {
  result_path: string;
  constructor(private matchList: PreviousList[]) {
    this.matchList = matchList;
    this.result_path = path.join(__dirname, '..', 'result');
  }
  async createResultsFile(): Promise<void> {
    try {
      let newDate = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
      let result_file_name = `Secret_Santa_Result_${newDate}.xlsx`;
      const workbook = xlsx.utils.book_new();
      const worksheet = xlsx.utils.json_to_sheet(this.matchList);
      xlsx.utils.book_append_sheet(workbook, worksheet, 'Secret_Santa_Result');
      xlsx.writeFile(workbook, path.join(this.result_path, result_file_name));
    } catch (error) {
      throw new Error(`Error in file creation: \n\n${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}