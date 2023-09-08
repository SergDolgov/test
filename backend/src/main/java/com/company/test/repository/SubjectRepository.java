package com.company.test.repository;

import com.company.test.entity.Subject;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubjectRepository extends JpaRepository<Subject, Long> {

    Subject findSubjectById(Long id);
}
