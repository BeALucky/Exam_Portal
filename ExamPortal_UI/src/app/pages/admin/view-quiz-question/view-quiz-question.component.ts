import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import Swal from 'sweetalert2';
import { Question } from '../../../models/Question';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-quiz-question',
  standalone: true,
  imports: [MatCardModule, CommonModule,MatDividerModule, MatButtonModule, RouterLink],
  templateUrl: './view-quiz-question.component.html',
  styleUrl: './view-quiz-question.component.css'
})
export class ViewQuizQuestionComponent implements OnInit {
      constructor(private _route: ActivatedRoute, private _question:QuestionService,
        private _snack:MatSnackBar
        // ,private router
      ){}

qId:any;
qTitle:any;
questions:Question[]=[];

  ngOnInit(): void {
    // throw new Error('Method not implemented.')
    this.qId = this._route.snapshot.paramMap.get("id");
    this.qTitle = this._route.snapshot.paramMap.get("title");
    this._question.getQuestionsOfQuiz(this.qId).subscribe(
      (data:any)=>{this.questions=data},  
      (error)  =>{console.log(error)}
    )

  }

  deleteQuestion(qid:any){
    console.log("question id is "+qid);
    Swal.fire({
      icon:'warning',
      title:"Are you sure?",
      confirmButtonText:'Delete',
      showCancelButton:true
    }).then((result)=>{
      if(result.isConfirmed){
        this._question.deleteQuestion(qid).subscribe(
          (data)=>{
            console.log("question deleted")
            this._snack.open('Question Deleted','',{
              duration: 3000,
            })
            this.questions = this.questions.filter((ques)=>ques.quesId !=qid)
            // Swal.fire('Success',"Question deleted",'success');
          }
          ,(error)=>{
            console.log(error);
            Swal.fire('Error',"Something went wrong while deleting question",'error');
          }
        )
      }
    })

  }
}
