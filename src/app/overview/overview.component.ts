import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Address, OverviewCustomer } from '../models';


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  customers: OverviewCustomer[] = [];
  addresses: Address[] = [];

  constructor(private customerService: CustomerService) {
  }

  ngOnInit() {
    this.customerService.getCustomers().subscribe(
      (response) => {
        response.forEach(customer => this.customers.push({
          ...customer,
          expand: false
        }));
      });
  }

}
