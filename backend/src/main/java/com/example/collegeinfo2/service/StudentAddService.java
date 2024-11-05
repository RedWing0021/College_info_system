package com.example.collegeinfo2.service;

import com.example.collegeinfo2.dto.StudentDto;
import com.example.collegeinfo2.model.*;
import com.example.collegeinfo2.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class StudentAddService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StudentRepository studentProfileRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Transactional
    public void createStudent(StudentDto studentDto) {
        // Create and save User
        User user = new User();
        user.setUsername(studentDto.getUsername());
        user.setPassword(studentDto.getPassword()); // Encrypt password
        user.setRole(Role.STUDENT);
        user.setName(studentDto.getName());
        user.setEmail(studentDto.getEmail());
        user.setPhone(studentDto.getPhone());
        user = userRepository.save(user);// Save the User entity first
        // Retrieve the Department entity
        Department department = departmentRepository.findDepartmentByName(studentDto.getDepartmentName());
        if (department == null) {
            throw new RuntimeException("Department not found: " + studentDto.getDepartmentName());
        }

        // Create and set StudentProfile
        StudentProfile studentProfile = new StudentProfile();
        studentProfile.setUser(user);
        studentProfile.setPhoto(studentDto.getPhoto());
        studentProfile.setDepartment(department);
        studentProfile.setYear(studentDto.getYear());
        studentProfileRepository.save(studentProfile);

        // Enroll the student in all courses of the department
        List<Course> courses = courseRepository.findByDepartmentId(department.getId());
        for (Course course : courses) {
            Enrollment enrollment = new Enrollment();
            enrollment.setStudent(studentProfile);
            enrollment.setCourse(course);
            enrollmentRepository.save(enrollment);
        }
    }

    @Transactional
    public void updateStudent(Long id, StudentDto studentDto) {
            if (userRepository.existsById(id)) {
                User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
                StudentProfile studentProfile = studentProfileRepository.findByUserId(id);

                user.setUsername(studentDto.getUsername());
                user.setPassword(studentDto.getPassword()); // Encrypt password
                user.setName(studentDto.getName());
                user.setEmail(studentDto.getEmail());
                user.setPhone(studentDto.getPhone());
                userRepository.save(user);

                Department department = departmentRepository.findByName(studentDto.getDepartmentName());
                if (department == null) {
                    throw new RuntimeException("Department not found: " + studentDto.getDepartmentName());
                }

                studentProfile.setPhoto(studentDto.getPhoto());
                studentProfile.setDepartment(department);
                studentProfile.setYear(studentDto.getYear());
                studentProfileRepository.save(studentProfile);
            }
//            else {
//                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student not found");
//            }
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error updating student: " + e.getMessage());
//        }
    }

    @Transactional
    public List<StudentDto> getStudent() {
        List<StudentProfile> studentProfiles = studentProfileRepository.findAll();
        List<StudentDto> StudentDtos = new ArrayList<>();

        for (StudentProfile studentProfile : studentProfiles) {
            User user= studentProfile.getUser();

            StudentDto dto = new StudentDto();
            dto.setId(user.getId());
            dto.setUsername(user.getUsername());
            dto.setName(user.getName());
            dto.setEmail(user.getEmail());
            dto.setPhone(user.getPhone());
            dto.setPhoto(studentProfile.getPhoto());
            dto.setDepartmentName(studentProfile.getDepartment().getName());
            dto.setYear(studentProfile.getYear());

            StudentDtos.add(dto);
        }
        return StudentDtos;
    }

    @Transactional
    public ResponseEntity<String> deleteStudent(Long id) {
            if (userRepository.existsById(id)) {
                StudentProfile studentProfile = studentProfileRepository.findByUserId(id);
//            	enrollmentRepository.deleteByUserId(studentProfile.getUserId());
                studentProfileRepository.deleteById((long) studentProfile.getId());
                userRepository.deleteById(id);
                return ResponseEntity.ok("Student deleted successfully");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student not found");
            }
        }
//        catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error deleting student: " + e.getMessage());
//        }
//    }

}
