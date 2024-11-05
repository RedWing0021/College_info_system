package com.example.collegeinfo2.repository;

import com.example.collegeinfo2.model.FacultyProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FacultyRepository extends JpaRepository<FacultyProfile,Long> {
    void deleteByUserId(Long id);
    FacultyProfile findByUserId(Long userId);
}
