import { create } from "domain";
import { FileService } from "./file-service";

class FormDataService {
  constructor() {
    // this.url = 'http://10.21.53.124:8080/';
    this.fileService = new FileService();
  }

  async uploadFormData(data) {
    const data1 = new FormData();
    data1.append("Files", data);

    return await this.fileService.uploadFileToServer(data1);
  }
}

export default new FormDataService();
