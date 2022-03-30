import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from './models';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private url = 'http://localhost:8080/customer';

  constructor(private http: HttpClient) {
  }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.url);
  }

  getCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>(this.url + '/' + id);
  }

  saveCustomers(customer: Customer) {
    return this.http.post(this.url, customer);
  }

  deleteCustomer(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
