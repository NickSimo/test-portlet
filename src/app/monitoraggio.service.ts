import { Injectable, Inject } from '@angular/core';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';

import { monitoraggio } from './monitoraggio';

@Injectable()
export class MonitoraggioService {

  baseURL: string = "http://localhost:8080/";

  constructor(@Inject(HttpClient) private http: HttpClient) {
  }

  getMonitoraggio(tipo:string): Observable<any> {
    return this.http.get(this.baseURL + 'monitoraggio?tipo=' + tipo)
  }

}