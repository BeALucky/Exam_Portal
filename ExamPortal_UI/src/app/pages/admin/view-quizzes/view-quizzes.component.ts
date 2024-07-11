import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { Category } from '../../../models/Category';
import { QuizService } from '../../../services/quiz.service';
import Swal from 'sweetalert2';
import { Quiz } from '../../../models/Quiz';
import { concatWith } from 'rxjs';

@Component({
  selector: 'app-view-quizzes',
  standalone: true,
  imports: [MatCardModule,MatListModule,MatIconModule,MatDividerModule,MatButtonModule, RouterLink],
  templateUrl: './view-quizzes.component.html',
  styleUrl: './view-quizzes.component.css'
})
export class ViewQuizzesComponent implements OnInit {
  // quizzes=[
  //   {
  //     qId: 23,
  //     title: "Basic Java Quiz",
  //     description: " ",
  //     maxMarks:"50",
  //     numberOfQuestions: '20',
  //     active: '',
  //     category: {
  //       title: 'programming',
  //       description : 'dagdg'
  //     }
  //   },
  // ]

 quizzes:Quiz[]=[];

  constructor(private quiz:QuizService){}

  ngOnInit(){
    this.quiz.quizzes().subscribe(
      (data:any)=>{
        this.quizzes=data;
        console.log(this.quizzes);
      },
      (error)=>{
        console.log(error);
        Swal.fire("Error!!","Error in loading data",'error')
      }

    )
  }

  deleteQuiz(qId?:string){
    // let qId = q.qid;
    console.log("----------> "+ qId);

    Swal.fire({
      icon:'warning',
      title:"Are you Sure ?",
      confirmButtonText:'Delete',
      showCancelButton:true
    }).then((result)=>{
      if(result.isConfirmed){
        this.quiz.deleteQuiz(qId).subscribe(
          (data)=>{
            console.log("Quiz DELETED");
            console.log(data);
            this.quizzes =  this.quizzes.filter((quiz)=>quiz.qid !=qId);
            Swal.fire('Success',"Quiz deleted",'success');
          },
          (error)=>{
            console.log(error);
            Swal.fire('Error',"Something went wrong while deleting quiz",'error');
          }
        )
      }
    })
  }
}
