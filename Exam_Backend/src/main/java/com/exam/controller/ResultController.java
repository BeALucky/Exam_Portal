package com.exam.controller;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exam.model.Role;
import com.exam.model.User;
import com.exam.model.UserRole;
import com.exam.model.exam.Result;
import com.exam.repo.ResultRepository;

@RestController
@RequestMapping("/result")
@CrossOrigin("*")
public class ResultController {
	@Autowired
	private ResultRepository repository;
	
	@PostMapping
	public ResponseEntity<Result> saveResult(@RequestBody Result result){
		System.out.println("Result saving...");
		User user = result.getUser();
		user.setProfile("default.png");
    	
    	//encoding password with bCryptPasswordEncoder
//    	user.setPassword(this.bCryptPasswordEncoder.encode(user.getPassword()));
    	
        Set<UserRole> roles = new HashSet<>();
        Role role = new Role();
        role.setRoleId(45L);
        role.setRoleName("NORMAL");

        UserRole userRole = new UserRole();
        userRole.setUser(user);
        userRole.setRole(role);

        roles.add(userRole);
        user.setUserRoles(roles);
		return ResponseEntity.ok(this.repository.save(result));
	}
	
}
