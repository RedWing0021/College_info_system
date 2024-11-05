package com.example.collegeinfo2.repository;

import com.example.collegeinfo2.model.Department;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartmentRepository extends JpaRepository<Department, Long> {
    Department findDepartmentByName(String name);

    Department findByName(String departmentName);
}
