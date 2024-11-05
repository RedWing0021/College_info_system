package com.example.collegeinfo2.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class StudentDto {

    private String username;
    private String password; // Ensure this is encrypted before saving
    private String name;
    private String email;
    private String phone;
    private String photo;
    private String departmentName;
    private String year;
    private List<CourseDto> course;
    private Long id;
}
