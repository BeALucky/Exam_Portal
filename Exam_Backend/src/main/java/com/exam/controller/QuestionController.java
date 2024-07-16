package com.exam.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exam.model.exam.Question;
import com.exam.model.exam.Quiz;
import com.exam.service.QuestionService;
import com.exam.service.QuizService;



@RestController
@CrossOrigin("*")
@RequestMapping("/question")
public class QuestionController {

	@Autowired
	private QuestionService questionService;
	
	@Autowired
	private QuizService quizService;
	
	//add question
	@PostMapping("/")
	public ResponseEntity<Question> add(@RequestBody Question question){
		return ResponseEntity.ok(this.questionService.addQuestion(question));
	}
	
	//Get Question
	@GetMapping("/")
	public ResponseEntity<?> get(){
		return ResponseEntity.ok(this.questionService.getQuestion());
	}
	
	//single question
	@GetMapping("/{qID}")
	public Question question(@PathVariable Long qID) {
		return this.questionService.getQuestion(qID);
	}
	
	//update question
	@PutMapping("/")
	public Question update(@RequestBody Question q) {
		System.out.println("updating question--> "+q);
		return this.questionService.updateQuestion(q);
	}
	
	//detele question
	@DeleteMapping("{qID}")
	public void delete(@PathVariable Long qID) {
		this.questionService.deleteQuestion(qID);
	}
	
	//get all question of any quiz
	@GetMapping("quiz/{qID}")
	public ResponseEntity<?> getQuestionsOfQuiz(@PathVariable Long qID){
//		Quiz quiz = new Quiz();
//		quiz.setQid(qID);
//		List<Question> questionsOfQuiz = this.questionService.getQuestions(quiz);
//		return ResponseEntity.ok(questionsOfQuiz);
		
		Quiz quiz = this.quizService.getQuiz(qID);
		Set<Question> questions = quiz.getQuestion();
		for(Question q: questions) {
			q.setAnswer(null);
		}
		List list = new ArrayList(questions);
		if(list.size() >= Integer.parseInt(quiz.getNumberOfQuestions())) {
			list = list.subList(0, Integer.parseInt(quiz.getNumberOfQuestions()));
			
		}
		Collections.shuffle(list);
		return ResponseEntity.ok(list);
	}
	
	
	//get all question of any quiz
	@GetMapping("quiz/all/{qID}")
	public ResponseEntity<?> getQuestionsOfQuizAdmin(@PathVariable Long qID){
		
		Quiz quiz = this.quizService.getQuiz(qID);
		Set<Question> questions = quiz.getQuestion();
//		List list = new ArrayList(questions);
		return ResponseEntity.ok(questions);
		
	}
	
	//eval quiz
	@PostMapping("/eval-quiz")
	public ResponseEntity<?> evalQuiz(@RequestBody List<Question> questions){
		System.out.println(questions);
		double marksGot=0;
		int correctAnswer =0;
		int attempted =0;
		for(Question q: questions){
			System.out.println(q.getGivenAnswer());
//			System.out.println(q.getAnswer());
			Question question = this.questionService.get(q.getQuesId());
			if(question.getAnswer().equals(q.getGivenAnswer())){
				//correct
				correctAnswer++;
				double marksSingle = Double.parseDouble(questions.get(0).getQuiz().getMaxMarks()) / questions.size();
				marksGot += marksSingle;
				
			}if(q.getGivenAnswer()!=null ) {
				attempted++;
			}
		}
		Map<Object, Object> map = Map.of("marksGot",marksGot, "correctAnswers",correctAnswer
				, "attempted",attempted);
		return ResponseEntity.ok(map);
	}
	
}
