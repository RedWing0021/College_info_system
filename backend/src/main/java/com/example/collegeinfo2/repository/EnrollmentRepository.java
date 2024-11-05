package com.example.collegeinfo2.repository;

import com.example.collegeinfo2.model.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EnrollmentRepository extends JpaRepository<Enrollment,Long> {
}
