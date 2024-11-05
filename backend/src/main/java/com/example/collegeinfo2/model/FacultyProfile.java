package com.example.collegeinfo2.model;

import jakarta.persistence.*;
import lombok.*;

import javax.swing.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "facultyprofile")
public class FacultyProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    //    @Column(name = "user_id")
//    private Long userId;
    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
    @Column(name = "photo")
    private String photo;

    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;

    @Column(name = "office_hours")
    private String officeHours;

//    public Department getDepartment() {
//        return department;
//    }


}
