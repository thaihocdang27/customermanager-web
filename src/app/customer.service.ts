import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from './overview/models';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private url = 'http://localhost:8080/customer';

    constructor(private http: HttpClient) { }

  getCustomers() : Observable<Customer[]>{
    return this.http.get<Customer[]>(this.url);
  }
}
