import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  url: any = environment.filterUri;

  constructor(private http: HttpClient) { }

  getFilteredDrivers(filters: Array<any>, userId: number, batchId: number) {
    return this.http.post(this.url, {
      "filterTypes": filters,
      "userId": userId,
      "batchId": batchId
    });
  }
}
