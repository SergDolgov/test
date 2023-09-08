package com.company.test.controller;

import com.company.test.dto.SubjectDTO;
import com.company.test.entity.Subject;
import com.company.test.entity.Views;
import com.company.test.repository.SubjectRepository;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/subjects")
public class SubjectController {
    private final SubjectRepository subjectRepository;

    @Autowired
    public SubjectController(SubjectRepository subjectRepository) {
        this.subjectRepository = subjectRepository;
    }

    @GetMapping
    public List<Subject> list() {
        return subjectRepository.findAll();
    }

    @GetMapping("{id}")
    public Subject getOne(@PathVariable("id") Subject subject) {
        return subject;
    }

    @PostMapping
    public Subject create(@RequestBody Subject subject) {
        return subjectRepository.save(subject);
    }

    @PutMapping("{id}")
    public Subject update(
            @PathVariable("id") Subject subjectFromDb,
            @RequestBody Subject subject
    ) {
        BeanUtils.copyProperties(subject, subjectFromDb, "id");

        return subjectRepository.save(subjectFromDb);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") Subject subject) {
        subjectRepository.delete(subject);
    }
}
