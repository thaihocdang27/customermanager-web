export interface Customer {
  id: number;

  firstName: string;

  lastName: string;

  email: string;

  phoneNumber: string;

  birthday: Date;

  addresses: Address[];
}

export interface Address {
  id: number;

  street: string;

  plz: number;

  city: string;
}

export interface OverviewCustomer extends Customer {
  expand: boolean;
}