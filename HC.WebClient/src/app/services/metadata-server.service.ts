import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MetaDataServerService {

  private apiUrl = 'http://localhost:7251';

  constructor(private http: HttpClient) {}

  mint(playerAddress: string): Observable<any> {
    const endpoint = `${this.apiUrl}/mint`;
    return this.http.post(endpoint, { playerAddress });
  }
}
