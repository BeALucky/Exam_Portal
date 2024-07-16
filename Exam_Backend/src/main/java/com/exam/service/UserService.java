package com.exam.service;

import com.exam.model.Role;
import com.exam.model.User;
import com.exam.model.UserRole;

import java.util.List;
import java.util.Set;

public interface UserService {
    // Creating user
    public User createUser(User user, Set<UserRole> userRoles) throws Exception;

    //get user
    public User getUser(String username);

    //Delete User
    public void deleteUser(Long userId);

    //Update user
    public User updateUser(String username, User user);
    
    //get All user
    public List<User> getAllUser();
}
