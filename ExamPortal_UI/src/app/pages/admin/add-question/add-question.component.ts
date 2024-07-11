import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from '../../../models/Question';
import { Quiz } from '../../../models/Quiz';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { QuestionService } from '../../../services/question.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, 
    MatButtonModule, FormsModule, CommonModule, CKEditorModule ],
  templateUrl: './add-question.component.html',
  styleUrl: './add-question.component.css'
})
export class AddQuestionComponent implements OnInit{

  constructor(private _route:ActivatedRoute, private _questionService:QuestionService, private _router:Router,  private snack: MatSnackBar){}

  public Editor = ClassicEditor;

  qId:any;
  title:any;
  // question = Object.create(Question);
   qz = new Quiz();
  question = new Question();
  ngOnInit(): void {
    // throw new Error('Method not implemented.');

    this.qId = this._route.snapshot.paramMap.get("qid");
    this.title = this._route.snapshot.paramMap.get("title");
    this.qz.qid = this.qId;
    this.question.quiz = this.qz;
    // console.log(""+this.qId)
    console.log(this.question);
  }

  addQuestion(){
    console.log(this.question);

    if(this.question.content?.trim() =='' || this.question.content==null){
      this.snack.open('Content Requried!!','',{
        duration:3000
      })
      return;
    }
    if(this.question.option1?.trim() =='' || this.question.option1==null){
      return;
    }
    if(this.question.option2?.trim() =='' || this.question.option2==null){
      return;
    }


    this._questionService.saveQuestion(this.question).subscribe(
      (data)=>{
        console.log("data saved")
        Swal.fire('Success!!',"Question Added Successfully", 'success')
        .then(
          ()=>{
            this._router.navigateByUrl("/admin/view-questions/"+this.qId+"/"+this.title);

          }
        )   
      },
      (error)=>{
        console.log("ERROR WHILE UPDATING")
        console.log(error);
        Swal.fire('Error!!',"Error while Adding Question", 'error')

      }
    )
  }
}
