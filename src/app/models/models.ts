export interface SideNavItem{
    title: string,
    link: string
}
export enum UserType{
    ADMIN,
    USER
}
export interface User{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    password: string;
    blocked: boolean;
    active: boolean;
    createdOn: string;
    userType: UserType;
    fine: number;
}

export interface Vehicle {
    id: number;
    name: string;
    category: string;
    subCategory: string;
    price: number;
    available: boolean;
    count?: number;
    brand: string;
  }
  
  export interface CategoryVehicles {
    category: string;
    subCategory: string;
    vehicles: Vehicle[];
  }
  
//   export interface Order {
//     id: number;
//     userid: number;
//     name: string;
//     bookid: number;
//     booktitle: string;
//     orderedon: string;
//     returned: boolean;
//   }
  
//   export interface Category {
//     name: string;
//     children?: Category[];
//   }