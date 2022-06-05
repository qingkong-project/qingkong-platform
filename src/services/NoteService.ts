import requset from "../utils/request";

export default class NoteService {
  static async listNote(): Promise<any> {
    return requset.post("/api/listNote");
  }
  static async retrieveANote(params: any): Promise<any> {
    return requset.post(`/api/retrieveANote`, params);
  }
  static async deleteANote(params: any): Promise<any> {
    return requset.post(`/api/deleteANote`, params);
  }
  static async updateANote(params: any): Promise<any> {
    return requset.post(`/api/updateANote`, params);
  }
  static async createANote(params: any): Promise<any> {
    return requset.post(`/api/createANote`, params);
  }
}
