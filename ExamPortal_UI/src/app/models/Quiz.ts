import { Category } from "./Category"

export class Quiz{
    qid?: string
    title?: string
    description?:string
    maxMarks?:string
    numberOfQuestions?: string
    active?: string
    category?: Category
}