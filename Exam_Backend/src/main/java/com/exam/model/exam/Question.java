package com.exam.model.exam;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name="question")
public class Question {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO )
	private Long quesId;
	
	@Transient	//hibernate ignore this and it will not save to the database
	private String givenAnswer;
	
	
	@Column(length =5000)
	private String content;
	private String image;
	private String option1;
	private String option2;
	private String option3;
	private String option4;
	
			//json ignore this and it will not include this in Response
	private String answer;
	
	@ManyToOne(fetch = FetchType.EAGER)
	private Quiz quiz;
	
//	@JsonIgnore  	//when serialize it ignore this variable
	public String getAnswer() {
		return this.answer;
	}
	
//	@JsonProperty		//when disserialize it allow to set value
	public void setAnswer(String answer) {
		this.answer = answer;
	}
	
}
