package com.exam.service;

import java.util.List;
import java.util.Set;

import com.exam.model.exam.Question;
import com.exam.model.exam.Quiz;

public interface QuestionService {

	public Question addQuestion(Question question);
	public Question updateQuestion(Question question);
	public Set<Question> getQuestion();
	public Question getQuestion(Long questionId);
	public void deleteQuestion(Long questionId);
	
	public List<Question> getQuestions(Quiz quiz);
	
	public Question get(Long questionId);
	
}
