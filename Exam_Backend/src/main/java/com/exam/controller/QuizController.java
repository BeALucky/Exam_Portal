package com.exam.controller;

import java.util.List;

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

import com.exam.model.exam.Category;
import com.exam.model.exam.Quiz;
import com.exam.service.QuizService;

@RestController
@RequestMapping("quiz")
@CrossOrigin("*")
public class QuizController {

	@Autowired
	private QuizService quizService;
	
	//Create quiz
	@PostMapping("/")
	public ResponseEntity<Quiz> add(@RequestBody Quiz quiz){
		return ResponseEntity.ok(this.quizService.addQuiz(quiz));
	}
	
	//update quiz
	@PutMapping("/")
	public ResponseEntity<Quiz> update(@RequestBody Quiz quiz){
		return ResponseEntity.ok(this.quizService.addQuiz(quiz));
	}
	
	//get quiz
	@GetMapping("/")
	public ResponseEntity<?> quizzes(){
		return ResponseEntity.ok(this.quizService.getQuizes());
	}
	
	//get single quiz
	@GetMapping("/{quizID}")
	public Quiz quiz(@PathVariable("quizID") Long quizID) {
		return this.quizService.getQuiz(quizID);
	}
	
	//delete quiz
	@DeleteMapping("/{qID}")
	public void delete(@PathVariable() Long qID) {
		System.out.println("Quiz ID is "+qID);
		this.quizService.deleteQuiz(qID);
	}
	
	//get quiz by catgory Id
	@GetMapping("/category/{cid}")
	public ResponseEntity<?> getQuizzesOfCategory(@PathVariable("cid") Long cid){
		Category category = new Category();
		category.setCid(cid);
		return ResponseEntity.ok(this.quizService.getQuzziesOfCategory(category));
	}
	
	//get active quiz
	@GetMapping("/active")
	public List<Quiz> getActiveQuizzes(){
		return this.quizService.getActiveQuizzes();
	}
	
	//get active quiz
		@GetMapping("/category/active/{cid}")
		public List<Quiz> getActiveQuizzesOfCategory(@PathVariable Long cid ){
			Category cat = new Category();
			cat.setCid(cid);
			return this.quizService.getActiveQuizzesOfCategory(cat);
		}
		
	
}
