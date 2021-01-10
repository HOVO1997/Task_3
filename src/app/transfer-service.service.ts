import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransferServiceService {

  constructor(private http: HttpClient) { }

  apiCall(): any{
    return this.http.get('/assets/resource.json');
  }
}
