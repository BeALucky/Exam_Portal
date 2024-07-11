import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/Quiz';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { Category } from '../../../models/Category';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-quiz',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule,FormsModule, MatInputModule, MatButtonModule,
    CommonModule,MatSlideToggleModule, MatSelectModule],
  templateUrl: './update-quiz.component.html',
  styleUrl: './update-quiz.component.css'
})
export class UpdateQuizComponent implements OnInit{

  constructor(private _router:ActivatedRoute, private _quiz: QuizService, private catService:CategoryService,
    private snack: MatSnackBar,
    private _route:Router

  ){}
qId:any;
// quiz?:Quiz={};
quiz = Object.create(Quiz);
categories?:Category[]=[];
temp=Object.create(Category);

  ngOnInit(): void {
    this.qId = this._router.snapshot.paramMap.get('qid');
    this._quiz.getQuiz(this.qId).subscribe(
      (data)=>{this.quiz=data
        this.temp = this.quiz.category;
        console.log("single quiz Fetched");
        console.log(this.quiz);

            // fetching category loading...
            console.log("category loading")
            this.catService.Categories().subscribe(
            (data:any)=>{
              this.categories=data;
            },
            (error)=>{
              console.log("ERROR WHILE Loading CATGORY")
              console.log(error);
              Swal.fire('Error!!',"Error while loading Cateogry", 'error')
            }
    )
      },
      (error)=>{console.log(error)}
    )
  }

  updateQuiz(){
    // this._quiz.

    
    if(this.quiz.title?.trim() =='' || this.quiz.title==null){
      this.snack.open('Title Requried!!','',{
        duration:3000
      })
      return;
    }

    this.quiz.category=this.temp;
    this._quiz.update(this.quiz).subscribe(
      (data)=>{
        console.log("Quiz Updated Success",data)
        Swal.fire('Success!!',"Quiz Updated Successfully", 'success')
        .then(
          ()=>{
            this._route.navigateByUrl("/admin/quizzes");

          }
        )        
      },
      (error)=>{
        console.log("ERROR WHILE UPDATING")
        console.log(error);
        Swal.fire('Error!!',"Error while Updating", 'error')
      }
    )
    
  }

}
