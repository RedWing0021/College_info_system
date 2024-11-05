package com.example.collegeinfo2.repository;

import com.example.collegeinfo2.model.AdministratorProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdministratorRepository extends JpaRepository<AdministratorProfile,Long> {
}
