import { NetInterface } from './../../interfaces/net';
import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetService implements NetInterface {

  private baseUrl: string = "https://pokeapi.co/api/v2"

  constructor(private http: HttpClient) { }

  getRequest(endpoint: string, option?: any): Observable<any> {
    return this.http.get(this.baseUrl + endpoint, option)
  }

}
