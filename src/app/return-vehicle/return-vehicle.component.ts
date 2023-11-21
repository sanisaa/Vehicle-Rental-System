import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-return-vehicle',
  templateUrl: './return-vehicle.component.html',
  styleUrls: ['./return-vehicle.component.scss']
})
export class ReturnVehicleComponent{
  status: string = '';
  vehicleForm: FormGroup;

  constructor(private api: ApiService, private fb: FormBuilder){
    this.vehicleForm = this.fb.group({
      vehicleId: fb.control('', [Validators.required]),
      userId: fb.control('', [Validators.required]),
    });
  }
  returnVehicle(){
    let vehicle = (this.vehicleForm.get('vehicleId') as FormControl).value;
    let user = (this.vehicleForm.get('userId') as FormControl).value;
    this.api.returnVehicle(vehicle, user).subscribe(
      (res: any)=>{
        console.log("Full message=", res);
        console.log("Message=",res.message);
          if(res.message == 'success'){
             this.status = 'Vehicle Returned';
          }else {
            this.status = 'Please Enter the details correctly';
          }
      }
    );
  }
  

}
