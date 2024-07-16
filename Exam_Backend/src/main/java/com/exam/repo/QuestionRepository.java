package com.exam.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.exam.model.exam.Question;
import com.exam.model.exam.Quiz;

public interface QuestionRepository extends JpaRepository<Question, Long>{
		public List<Question> findByQuiz(Quiz quiz);
}
