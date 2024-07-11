import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Question } from '../../../models/Question';
import { QuestionService } from '../../../services/question.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-update-question',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, 
    MatButtonModule, FormsModule, CommonModule, CKEditorModule ],
  templateUrl: './update-question.component.html',
  styleUrl: './update-question.component.css'
})
export class UpdateQuestionComponent implements OnInit {
  constructor(private route:ActivatedRoute, private _ques:QuestionService,
    private snack:MatSnackBar, private _router:Router

  ){}


  quesID:any;
  public Editor = ClassicEditor;
  question = new Question();
  ngOnInit(): void {
      this.quesID = this.route.snapshot.paramMap.get("quesId");
      this._ques.getQuestionById(this.quesID).subscribe(
        (data)=>{this.question=data}
      )
  }

  updateQuestion(){
    // this._quiz.

    
    if(this.question.content?.trim() =='' || this.question.content==null){
      this.snack.open('Title Requried!!','',{
        duration:3000
      })
      return;
    }

   
    this._ques.updateQuestion(this.question).subscribe(
      (data)=>{
        console.log("Question Updated Success",data)
        Swal.fire('Success!!',"Question Updated Successfully", 'success')
        .then(
          ()=>{
            this._router.navigateByUrl("/admin/view-questions/"+this.question.quiz?.qid+"/"+this.question.quiz?.title);

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
