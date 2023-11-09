import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.scss']
})
export class ManageCategoriesComponent {
  categoryForm: FormGroup;
  msg: string = '';

  constructor(private fb: FormBuilder, private api: ApiService){
    this.categoryForm = fb.group({
      category: this.fb.control('', Validators.required),
      subcategory: this.fb.control('', Validators.required),
    });
  }

  get Category(): FormControl{
    return this.categoryForm.get('category') as FormControl;
  }
  get SubCategory(): FormControl{
    return this.categoryForm.get('subcategory') as FormControl;
  }

  addNewCategory(){
    let c = this.Category.value;
    let s = this.SubCategory.value;

    this.api.insertCategory(c, s).subscribe(
      (res: any)=> {
        this.msg = res.toString();
        setInterval(()=> (this.msg = ''), 5000);
      }
    );
  }
}
