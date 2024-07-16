package com.exam.controller;

import com.exam.model.Role;
import com.exam.model.User;
import com.exam.model.UserRole;
import com.exam.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {
    @Autowired
    private UserService userService;
    
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    
    @GetMapping("/test")
    public String test() {
    	return "Welcome to backend api of Examportal";
    }

    //creating user
    @PostMapping("/")
    public User creatUser(@RequestBody User user) throws Exception {

    	user.setProfile("default.png");
    	
    	//encoding password with bCryptPasswordEncoder
    	user.setPassword(this.bCryptPasswordEncoder.encode(user.getPassword()));
    	
        Set<UserRole> roles = new HashSet<>();
        Role role = new Role();
        role.setRoleId(45L);
        role.setRoleName("NORMAL");

        UserRole userRole = new UserRole();
        userRole.setUser(user);
        userRole.setRole(role);

        roles.add(userRole);
        return (this.userService.createUser(user,roles ));
    }

    @GetMapping("/{username}")
    public User getUser(@PathVariable("username") String username){
        return this.userService.getUser(username);
    }

    //find all user
    @GetMapping("/getAll")
    public List<User> getAllUser(){
        System.out.println("finding all users...");
        return this.userService.getAllUser();
    }


    //Delete the user by id
    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable("userId") Long userId){
        this.userService.deleteUser(userId);
    }

    //Update API
    @PutMapping("/{username}")
    public User updateUser(@PathVariable("username") String username, @RequestBody User user ){
        System.out.println("UPDATING... USER DETAILS");
      return  this.userService.updateUser(username, user);
    }
}
