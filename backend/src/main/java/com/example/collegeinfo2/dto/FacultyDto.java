package com.example.collegeinfo2.dto;

import com.example.collegeinfo2.model.Course;
import com.example.collegeinfo2.model.Role;
import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class FacultyDto {
    private String username;
    private String password; // Ensure this is encrypted before saving
    private String name;
    private String email;
    private String phone;
    private String photo;
    private String departmentName;
    private String officehours;
    private List<CourseDto> course;
    private Long id;
//    private String coursetitle;
//    private String coursedescription;
}
