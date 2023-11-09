import { CloseScrollStrategy } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-manage-vehicles',
  templateUrl: './manage-vehicles.component.html',
  styleUrls: ['./manage-vehicles.component.scss']
})
export class ManageVehiclesComponent {
  addVehicleForm: FormGroup;
  deleteVehicleForm: FormControl;

  addMsg: string = '';
  delMsg: string = '';

  constructor(private api: ApiService, private fb: FormBuilder){
    this.addVehicleForm = fb.group({
      name: fb.control('', [Validators.required]),
      brand: fb.control('', [Validators.required]),
      category: fb.control('', [Validators.required]),
      subcategory: fb.control('', [Validators.required]),
      price: fb.control('', [Validators.required]),
    });

    this.deleteVehicleForm = fb.control('', [Validators.required]);
  }

  insertVehicle(){
    let vehicle = {
      id: 0,
      name: this.Name.value,
      category: {
        category: this.Category.value,
        SubCategory: this.Subcategory.value,
      },
      price: this.Price.value,
      available: true,
      brand: this.Brand.value,
    };

    this.api.insertVehicle(vehicle).subscribe(
      (res: any)=> {
        this.addMsg = 'Vehicle Inserted';
        setInterval(() => (this.addMsg = ''), 5000);
        this.Name.setValue('');
        this.Brand.setValue('');
        this.Category.setValue('');
        this.Subcategory.setValue('');
        this.Price.setValue('');
      },
    )
  }
  deleteVehicle() {
    let id: number = parseInt(this.deleteVehicleForm.value);
  
    this.api.deleteVehicle(id).subscribe(
     (res: any) => {
        console.log("Full server response:", res); // Log the entire response
        console.log("Message:", res.message);
        res= JSON.parse(res);
        if (res.message=="success") {
          this.delMsg = 'Vehicle Deleted';
        } else {
          this.delMsg = 'Unexpected response from the server';
        }
  
        setInterval(() => (this.delMsg = ''), 5000);
      }
    );
  }
  

get Name(): FormControl {
    return this.addVehicleForm.get('name') as FormControl;
  }
  get Brand(): FormControl {
    return this.addVehicleForm.get('brand') as FormControl;
  }
  get Category(): FormControl {
    return this.addVehicleForm.get('category') as FormControl;
  }
  get Subcategory(): FormControl {
    return this.addVehicleForm.get('subcategory') as FormControl;
  }
  get Price(): FormControl {
    return this.addVehicleForm.get('price') as FormControl;
  }
}
