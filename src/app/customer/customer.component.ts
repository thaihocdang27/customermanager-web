import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../customer.service';
import { Customer } from '../models';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  firstName: FormControl = this.fb.control(undefined, Validators.required);
  lastName: FormControl = this.fb.control(undefined, Validators.required);
  email: FormControl = this.fb.control(undefined, Validators.required);
  phoneNumber: FormControl = this.fb.control(undefined, Validators.required);
  birthday: FormControl = this.fb.control(undefined, Validators.required);
  streets: FormArray = this.fb.array([]);
  plzs: FormArray = this.fb.array([]);
  cities: FormArray = this.fb.array([]);

  validateForm: FormGroup = this.fb.group({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phoneNumber: this.phoneNumber,
      birthday: this.birthday,
      streets: this.streets,
      plzs: this.plzs,
      cities: this.cities
    }
  );
  customerId?: number;
  customer: Customer = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    birthday: new Date(),
    addresses: []
  };

  constructor(private fb: FormBuilder, private customerService: CustomerService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.customerId = params['id'];
      if (this.customerId !== undefined) {
        this.customerService.getCustomer(this.customerId).subscribe(response => {
          this.customer = response;
          this.firstName.setValue(this.customer.firstName);
          this.lastName.setValue(this.customer.lastName);
          this.email.setValue(this.customer.email);
          this.phoneNumber.setValue(this.customer.phoneNumber);
          this.birthday.setValue(this.customer.birthday);
          this.customer.addresses.forEach(address => {
            this.streets.push(new FormControl(address.street, Validators.required));
            this.plzs.push(new FormControl(address.plz, Validators.required));
            this.cities.push(new FormControl(address.city, Validators.required));
          });
        });
      } else {
        this.addField();
      }
    });
  }

  submitForm() {
    if (this.validateForm.valid) {
      this.customer.firstName = this.validateForm.value.firstName;
      this.customer.lastName = this.validateForm.value.lastName;
      this.customer.email = this.validateForm.value.email;
      this.customer.phoneNumber = this.validateForm.value.phoneNumber;
      this.customer.birthday = this.validateForm.value.birthday;
      this.customer.addresses.map((address, i) => {
        address.street = this.streets.controls[i].value;
        address.plz = this.plzs.controls[i].value;
        address.city = this.cities.controls[i].value;
        return address;
      });
      console.log(this.customer);
      this.customerService.saveCustomers(this.customer).subscribe(() => this.router.navigate(['/home']));
    } else {
      console.log('dirty');
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });
    }
  }

  addField(): void {
    this.customer.addresses.push({
      id: 0,
      street: '',
      plz: 0,
      city: ''
    });
    this.streets.push(this.fb.control(undefined, Validators.required)
    );
    this.plzs.push(this.fb.control(undefined, Validators.required)
    );
    this.cities.push(this.fb.control(undefined, Validators.required)
    );
  }

  removeField(index: number): void {
    this.streets.removeAt(index);
    this.plzs.removeAt(index);
    this.cities.removeAt(index);
    this.customer.addresses.splice(index, 1);
  }
}
