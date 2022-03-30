import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Customer } from '../models';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  validateForm: FormGroup = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      birthday: [null, [Validators.required]],
      streets: this.fb.array([]),
      plzs: this.fb.array([]),
      cities: this.fb.array([])
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

  constructor(private fb: FormBuilder) {
  }

  get streets() {
    return this.validateForm.controls['streets'] as FormArray;
  }

  get plzs() {
    return this.validateForm.controls['plzs'] as FormArray;
  }

  get cities() {
    return this.validateForm.controls['cities'] as FormArray;
  }

  ngOnInit() {
    if (this.customerId !== undefined) {
      //get customer
    }
    this.addField();
  }

  submitForm() {
    if (this.validateForm.valid) {

    } else {
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
    this.streets.push(new FormControl(null, Validators.required)
    );
    this.plzs.push(new FormControl(null, Validators.required)
    );
    this.cities.push(new FormControl(null, Validators.required)
    );
  }

  removeField(index: number): void {
    this.streets.removeAt(index);
    this.plzs.removeAt(index);
    this.cities.removeAt(index);
    this.customer.addresses.splice(index, 1);
  }
}
