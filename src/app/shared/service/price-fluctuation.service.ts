import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs-compat/add/operator/map';
import {Observable} from 'rxjs';
import {Comment} from '../model/comment';
import {StatisticResult} from '../model/statistic.result';

@Injectable()
export class PriceFluctuationService {

  private baseUrl = 'http://localhost:5001';

  constructor(private httpClient: HttpClient) {}

  getStatistics(nrRooms: string, constructionYear: string, distributor: string): Observable<StatisticResult> {
    const url = `${this.baseUrl}/statistic`;
    const body = {nrRooms, constructionYear, distributor};
    return this.httpClient.post<StatisticResult>(url, body);
  }

}
