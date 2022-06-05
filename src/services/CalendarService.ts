import requset from "../utils/request";

export default class CalendarService {
  static async listCalendar(): Promise<any> {
    return requset.get("/translation-api/translation");
  }

  static async retrieveACalendar({ id }: any): Promise<any> {
    return requset.get(`/translation-api/translation/${id}`);
  }

  static async deleteACalendar({ id }: any): Promise<any> {
    return requset.delete(`/translation-api/translation/${id}`);
  }

  static async updateACalendar(params: any): Promise<any> {
    const { id } = params;
    // eslint-disable-next-line no-param-reassign
    delete params.id;
    return requset.patch(`/translation-api/translation/${id}`, params);
  }

  static async createACalendar(params: any): Promise<any> {
    return requset.post(`/translation-api/translation`, params);
  }
}
