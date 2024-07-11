import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Quiz } from '../models/Quiz';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { }

  public quizzes(){
    return this.http.get(baseUrl+"/quiz/");
  }

  public addQuiz(q:Quiz){
    return this.http.post(baseUrl+"/quiz/",q);
  }

  public deleteQuiz(qId?:string){
    return this.http.delete(baseUrl+"/quiz/"+qId);
  }

  //get the single quiz
  public getQuiz(qId?:string){
    return this.http.get(baseUrl+"/quiz/"+qId);
  }

  //update quiz
  public update(q:Quiz){
    return this.http.put(baseUrl+"/quiz/", q);
  }

  //get quizzes of category
  public getQuizzesOfCategory(cid:any){
    return this.http.get(baseUrl+"/quiz/category/"+cid);
  }

  //get Active Quizzes
  public getActiveQuizzes(){
    return this.http.get(baseUrl+"/quiz/active");
  }

  //get Active Quizzes
  public getActiveQuizzesOfCategory(cid:any){
    return this.http.get(baseUrl+"/quiz/category/active/"+cid);
  }
}
