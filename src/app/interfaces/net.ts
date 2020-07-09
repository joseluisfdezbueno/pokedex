import { Observable } from 'rxjs';

export interface Net {

    getRequest(endpoint: string, option?: any): Observable<any>

}

export abstract class NetInterface implements Net {

    abstract getRequest(endpoint: string, option?: any): Observable<any>

}