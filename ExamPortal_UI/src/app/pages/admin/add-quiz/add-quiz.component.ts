import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/Category';
import { Quiz } from '../../../models/Quiz';
import { QuizService } from '../../../services/quiz.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-quiz',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule,FormsModule, MatInputModule, MatButtonModule,
     CommonModule,MatSlideToggleModule, MatSelectModule],
  templateUrl: './add-quiz.component.html',
  styleUrl: './add-quiz.component.css'
})
export class AddQuizComponent implements OnInit {
  constructor(private catService: CategoryService, private quizService: QuizService, private snack: MatSnackBar){}
  
  categories:Category[]=[];
  @ViewChild("myquizform") form?: NgForm;

  quiz:Quiz={};
  temp:Category={}
  ngOnInit(): void {
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
  }


  // categories=[
  //   {cid:12,
  //     title:'Prgramming'
  //   },
  //   {cid:12,
  //     title:'Accounting'
  //   }
  // ]

  formSubmit(){
    console.log("Form data submitting");

    if(this.quiz.title?.trim() =='' || this.quiz.title==null){
      this.snack.open('Title Requried!!','',{
        duration:3000
      })
      return;
    }

    this.quiz.category=this.temp;
    this.quizService.addQuiz(this.quiz).subscribe(
      (data)=>{
        console.log("Quiz Added Success",data)
        Swal.fire('Success!!',"Quiz Added Successfully", 'success')
        this.form?.reset();
      },
      (error)=>{
        console.log("ERROR WHILE ADDING Quiz")
        console.log(error);
        Swal.fire('Error!!',"Error while Adding", 'error')
      }
    )
  }

  
}
