package com.exam.model;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
//import com.jwt.example.JwtExample3.models.JwtResponse;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class JwtResponse {
	   private String jwtToken;
	    private String username;
}
