import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CustomerService } from '../customer.service';
import { Address, Customer, OverviewCustomer } from '../models';


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  customers: OverviewCustomer[] = [];
  addresses: Address[] = [];

  constructor(private customerService: CustomerService, private router: Router, private modal: NzModalService) {
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

  createCustomer() {
    this.router.navigate(['/create']);
  }

  editCustomer(id: number) {
    this.router.navigate(['/edit'], {queryParams: {id: id}});
  }

  deleteCustomer(customer: Customer) {
    this.modal.confirm({
      nzTitle: '<i>Wollen Sie wirklich diesn Customer löschen?</i>',
      nzContent: '<b>' + customer.firstName + ' ' + customer.lastName + '</b>',
      nzOnOk: () => this.customerService.deleteCustomer(customer.id).subscribe(() => window.location.reload())
    });
  }

  formatDate(date: Date) {
    return formatDate(date, 'dd.MM.yyyy', 'en-US');
  }
}
