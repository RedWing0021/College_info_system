package com.example.collegeinfo2.controller;

import com.example.collegeinfo2.dto.FacultyDto;
import com.example.collegeinfo2.dto.StudentDto;
import com.example.collegeinfo2.repository.DepartmentRepository;
import com.example.collegeinfo2.service.FacultyAddService;
import com.example.collegeinfo2.service.StudentAddService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/admin")
public class AdministratorController {
    @Autowired
    private FacultyAddService facultyAddService;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private StudentAddService studentAddService;

    @GetMapping("/hello")
    public ResponseEntity<String> hello(){
        return ResponseEntity.ok("success LOL");
    }

    //for faculty
    @PostMapping("/faculty")
    public ResponseEntity<Void> createFaculty(@RequestBody FacultyDto facultyDto) {
        facultyAddService.createFaculty(facultyDto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/faculty/{id}")
    public ResponseEntity<Void> updateFaculty(@RequestBody FacultyDto facultyDto, @PathVariable long id) {
        facultyAddService.updateFaculty(id,facultyDto);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/faculty")
    public ResponseEntity<List<FacultyDto>> getFaculty() {
        return ResponseEntity.ok(facultyAddService.getFaculty());
    }

    @DeleteMapping("/faculty/{id}")
    public ResponseEntity<String> deleteFaculty(@PathVariable long id) {
        return facultyAddService.deleteFaculty(id);
    }


    //for students
    @PostMapping("/student")
    public ResponseEntity<Void> createStudent(@RequestBody StudentDto studentDto) {
        studentAddService.createStudent(studentDto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
    @PutMapping("/student/{id}")
    public ResponseEntity<Void> updateStudent(@RequestBody StudentDto studentDto, @PathVariable long id) {
        studentAddService.updateStudent(id,studentDto);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/student")
    public ResponseEntity<List<StudentDto>> getStudent() {
        return ResponseEntity.ok(studentAddService.getStudent());
    }

    @DeleteMapping("/student/{id}")
    public ResponseEntity<String> deleteStudent(@PathVariable long id) {
        return studentAddService.deleteStudent(id);
    }

}
