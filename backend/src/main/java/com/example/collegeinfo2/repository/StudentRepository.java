package com.example.collegeinfo2.repository;

import com.example.collegeinfo2.model.StudentProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<StudentProfile,Long> {

    StudentProfile findByUserId(Long id);
}
