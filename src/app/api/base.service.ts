import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

export class BaseService {
  protected readonly API = environment.apiURL;

  constructor(protected httpClient: HttpClient) {}

  protected create<T, D>(item: T, path: string, useCredentials: boolean) {
    const { url, options } = this.getUrlAndOptions(path, useCredentials);
    return this.httpClient.post<D>(url, item, options);
  }

  protected getOne<T>(id: string, path: string, useCredentials: boolean) {
    const { url, options } = this.getUrlAndOptions(path, useCredentials, id);
    return this.httpClient.get<T>(url, options);
  }

  protected getAll<T>(path: string, useCredentials: boolean) {
    const { url, options } = this.getUrlAndOptions(path, useCredentials);
    return this.httpClient.get<T>(url, options);
  }

  protected update<T, D>(id: string, item: T, path: string, useCredentials: boolean) {
    const { url, options } = this.getUrlAndOptions(path, useCredentials, id);
    return this.httpClient.put<D>(url, item, options);
  }

  protected delete<T>(id: string, path: string, useCredentials: boolean) {
    const { url, options } = this.getUrlAndOptions(path, useCredentials, id);
    return this.httpClient.delete<T>(url, options);
  }

  protected getUrlAndOptions(path: string, useCredentials: boolean, id?: string) {
    const url = id ? `${this.API}/${path}/${id}` : `${this.API}/${path}`;
    const options = useCredentials ? { withCredentials: true } : {};
    return { url, options };
  }

  protected createQueryParams(item: any) {
    let params = new HttpParams();
    Object.keys(item).forEach((key) => {
      params = params.set(key, item[key]);
    });
    return params;
  }
}
