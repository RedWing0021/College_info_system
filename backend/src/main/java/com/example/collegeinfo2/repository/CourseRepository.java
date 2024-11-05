package com.example.collegeinfo2.repository;

import com.example.collegeinfo2.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Long> {
    boolean existsByTitle(String title);

    Course findByTitle(String title);
    void deleteAllByFacultyId(Long id);

    List<Course> findByDepartmentId(Long id);
}
