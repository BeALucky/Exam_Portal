package com.exam.model.exam;

import java.util.Set;

import com.exam.model.User;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name="result")
public class Result {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO )
	private Long result_id;
	private String marksGot;
	private String correctAnswer;
	private String attempted;
	
//	@Column(name="id")
	@ManyToOne
	private User user;
}
