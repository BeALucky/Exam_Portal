package com.exam.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import com.exam.model.exam.Result;

@Service
public interface ResultRepository extends JpaRepository<Result, Long> {

}
