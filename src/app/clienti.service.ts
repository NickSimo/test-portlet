import { Injectable, Inject } from '@angular/core';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';

import { clienti } from './clienti';

@Injectable()
export class ClientiService {

  baseURL: string = "http://localhost:8080/clienti/";

  constructor(@Inject(HttpClient) private http: HttpClient) {
  }

  getClienti(): Observable<any> {
    return this.http.get(this.baseURL + 'elenco')
  }

}