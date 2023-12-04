import { Component, OnInit } from '@angular/core';
import { Feedback } from '../models/models';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.scss']
})
export class FeedbacksComponent implements OnInit{
  listOfFeedback: Feedback[] = [];
  columns: string[] = ['id', 'uid', 'name', 'feedback']
  constructor(private api: ApiService){}
  ngOnInit(): void {
   this.api.getAllFeedback().subscribe({
    next:(res: Feedback[])=>{
       console.log("Feedbacks:", res);
       this.listOfFeedback = res;
     },
     error: (err: any) => console.log(err),
   });
  }

}
