import requset from "../utils/request";

export default class UserService {
  static async getPersonalInfoThroughToken(): Promise<any> {
    return requset.post("/api/user/getPersonalInfoThroughToken");
  }

  static async modifyUserinfo(params: any): Promise<any> {
    return requset.post("/api/user/modifyUserinfo", params);
  }
}
