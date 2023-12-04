import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-add-feedback',
  templateUrl: './add-feedback.component.html',
  styleUrls: ['./add-feedback.component.scss']
})
export class AddFeedbackComponent {
  feedbackForm: FormGroup;
  msg: string = '';

  constructor(private fb: FormBuilder, private api: ApiService) {
    this.feedbackForm = fb.group({
      feedback: this.fb.control('', Validators.required)
    });
  }

  get Feedback(): FormControl {
    return this.feedbackForm.get('feedback') as FormControl;
  }

  submitFeedback() {
    let f = this.Feedback.value;
    let u = this.api.getTokenUserInfo()?.id ?? 0;
  
    this.api.addFeedback(u, f).subscribe(
      (res: any) => {
        console.log(res.message);
      
        if (res.message == 'Feedback Inserted') {
          this.msg = 'Feedback submitted';
          setTimeout(() => (this.msg = ''), 5000);
        }
      },
      (error) => {
        console.error('Error submitting feedback', error);
        this.msg = 'Error submitting feedback';
        setTimeout(() => (this.msg = ''), 5000);
      }
    );
  }
  
}
