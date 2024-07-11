import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Question } from '../models/Question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _http:HttpClient) { }

  //used by admin
  public getQuestionsOfQuiz(qId:string){
    return this._http.get(baseUrl+"/question/quiz/all/"+qId);
  }
  public getQuestionsOfQuizForTest(qId:string){
    return this._http.get(baseUrl+"/question/quiz/"+qId);
  }

  public saveQuestion(q:Question){
    return this._http.post(baseUrl+'/question/',q);
  }

  public deleteQuestion(qid:string){
    return this._http.delete(baseUrl+"/question/"+qid);
  }

  public getQuestionById(qid:string){
    return this._http.get(baseUrl+"/question/"+qid)
  }

  public updateQuestion(q:Question){
    // console.log("***************")
    // console.log(q);
    return this._http.put(baseUrl+'/question/',q);
  }

  //eval quiz
  public evalQuiz(questions:any){
    return this._http.post(baseUrl+"/question/eval-quiz",questions);
  }
}
