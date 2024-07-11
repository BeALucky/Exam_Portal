import { Quiz } from "./Quiz";

export class Question{
    quesId?:string
    quiz?: Quiz
    content?:string
    option1?:string
    option2?:string
    option3?:string
    option4?:string
    answer?:string
    givenAnswer?:string
}