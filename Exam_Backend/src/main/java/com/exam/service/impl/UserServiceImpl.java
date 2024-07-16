package com.exam.service.impl;

import com.exam.model.User;
import com.exam.model.UserRole;
import com.exam.repo.RoleRepository;
import com.exam.repo.UserRepository;
import com.exam.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;

    @Override
    public User createUser(User user, Set<UserRole> userRoles) throws Exception {
       User local = this.userRepository.findByUsername(user.getUsername());
       if(local!=null){
           System.out.println("User is already there!!");
           throw new Exception("User already present");
       }
       else{
           //create user
           for(UserRole ur:userRoles){
               this.roleRepository.save(ur.getRole());
           }
           user.getUserRoles().addAll(userRoles);
           local = this.userRepository.save(user);
       }
       return local;
    }

    @Override
    public User getUser(String username) {
          return  this.userRepository.findByUsername(username);
    }

    public List<User> getAllUser(){
        return this.userRepository.findAll();
    }

    @Override
    public void deleteUser(Long userId) {
        this.userRepository.deleteById(userId);
    }

    @Override
    public User updateUser(String username, User user) {
        User temp = this.userRepository.findByUsername(username);
        if(temp != null){
            this.userRepository.save(user);
        return user;
        }
        return null;
    }
}
