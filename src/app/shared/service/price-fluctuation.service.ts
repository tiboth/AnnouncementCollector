import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs-compat/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class PriceFluctuationService {

  constructor(private http: HttpClient) { }

}
