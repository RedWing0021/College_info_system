package com.example.collegeinfo2.service;

import com.example.collegeinfo2.dto.CourseDto;
import com.example.collegeinfo2.dto.FacultyDto;
import com.example.collegeinfo2.model.*;
import com.example.collegeinfo2.repository.CourseRepository;
import com.example.collegeinfo2.repository.DepartmentRepository;
import com.example.collegeinfo2.repository.FacultyRepository;
import com.example.collegeinfo2.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FacultyAddService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FacultyRepository facultyProfileRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Transactional
    public void createFaculty(FacultyDto facultyDto) {

        for (CourseDto courseDto : facultyDto.getCourse()) {
            if (courseRepository.existsByTitle(courseDto.getTitle())) {
                throw new RuntimeException("Course " + courseDto.getTitle() + " is already assigned to another faculty.");
            }
        }
        // Create and save User
        User user = new User();
        user.setUsername(facultyDto.getUsername());
        user.setPassword(facultyDto.getPassword()); // Encrypt password
        user.setRole(Role.FACULTY_MEMBER);
        user.setName(facultyDto.getName());
        user.setEmail(facultyDto.getEmail());
        user.setPhone(facultyDto.getPhone());
        user = userRepository.save(user);// Save the User entity first

        // Retrieve the Department entity
        Department department = departmentRepository.findDepartmentByName(facultyDto.getDepartmentName());
        if (department == null) {
            throw new RuntimeException("Department not found: " + facultyDto.getDepartmentName());
        }

        // Create and set FacultyProfile
        FacultyProfile facultyProfile = new FacultyProfile();
        facultyProfile.setUser(user);  // Set the User reference
        facultyProfile.setPhoto(facultyDto.getPhoto());
        facultyProfile.setDepartment(department);
        facultyProfile.setOfficeHours(facultyDto.getOfficehours());
        facultyProfileRepository.save(facultyProfile);// Save the FacultyProfile entity

        List<Course> courses = facultyDto.getCourse().stream()
                .map(courseDto -> new Course(null, courseDto.getTitle(), courseDto.getDescription(), department, facultyProfile))
                .collect(Collectors.toList());
        courseRepository.saveAll(courses);
    }

    @Transactional
    public void updateFaculty(Long id, FacultyDto facultyDto) {
        for (CourseDto courseDto : facultyDto.getCourse()) {
            Course course = courseRepository.findByTitle(courseDto.getTitle());
            if (course != null && !course.getFaculty().getId().equals(id)) {
                throw new RuntimeException("Course " + courseDto.getTitle() + " is already assigned to another faculty.");
            }
        }
        // Proceed with updating the faculty
        if (userRepository.existsById(id) && facultyProfileRepository.existsById(id)) {
            User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
            FacultyProfile facultyProfile = facultyProfileRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("FacultyProfile not found"));

            user.setUsername(facultyDto.getUsername());
            user.setPassword(facultyDto.getPassword()); // Encrypt password
            user.setName(facultyDto.getName());
            user.setEmail(facultyDto.getEmail());
            user.setPhone(facultyDto.getPhone());
            userRepository.save(user);

            Department department = departmentRepository.findByName(facultyDto.getDepartmentName());
            if (department == null) {
                throw new RuntimeException("Department not found: " + facultyDto.getDepartmentName());
            }

            facultyProfile.setPhoto(facultyDto.getPhoto());
            facultyProfile.setDepartment(department);
            facultyProfile.setOfficeHours(facultyDto.getOfficehours());
            facultyProfileRepository.save(facultyProfile);

//            courseRepository.deleteAllByFacultyId(id);
//            List<Course> courses = facultyDto.getCourse().stream()
//                    .map(courseDto -> new Course(null, courseDto.getTitle(), courseDto.getDescription(), department, facultyProfile))
//                    .collect(Collectors.toList());
//            courseRepository.saveAll(courses);
        }
    }

    @Transactional
    public List<FacultyDto> getFaculty() {
        List<FacultyProfile> facultyProfiles = facultyProfileRepository.findAll();
        List<FacultyDto> facultyDtos = new ArrayList<>();

        for (FacultyProfile facultyProfile : facultyProfiles) {
            User user = facultyProfile.getUser();

            FacultyDto dto = new FacultyDto();
            dto.setId(user.getId());
            dto.setUsername(user.getUsername());
            dto.setName(user.getName());
            dto.setEmail(user.getEmail());
            dto.setPhone(user.getPhone());
            dto.setPhoto(facultyProfile.getPhoto());
            dto.setDepartmentName(facultyProfile.getDepartment().getName());
            dto.setOfficehours(facultyProfile.getOfficeHours());
            facultyDtos.add(dto);
        }
        return facultyDtos;
    }

    @Transactional
    public ResponseEntity<String> deleteFaculty(Long id) {
        if (userRepository.existsById(id)) {
            FacultyProfile facultyProfile = facultyProfileRepository.findByUserId(id);
            courseRepository.deleteAllByFacultyId(facultyProfile.getId());
            facultyProfileRepository.deleteByUserId(id);
            userRepository.deleteById(id);
            return ResponseEntity.ok("Faculty deleted successfully");
        }
        else{
            return ResponseEntity.ok("Faculty not fount");
        }
    }


}
