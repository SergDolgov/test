package com.company.test.repository;

import com.company.test.entity.Dept;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeptRepository extends JpaRepository<Dept, Long> {
    Dept findDeptById(Long id);

    Dept findDeptByName(String name);
}
