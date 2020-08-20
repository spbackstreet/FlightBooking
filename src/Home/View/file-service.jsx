import Service from "./service";

export class FileService {
  uploadFileToServer(data) {
    return Service.getRestClient().post("", data);
  }
}
