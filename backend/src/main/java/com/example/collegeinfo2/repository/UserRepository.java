package com.example.collegeinfo2.repository;

import com.example.collegeinfo2.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {
}
