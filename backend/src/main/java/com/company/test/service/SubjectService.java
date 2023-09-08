package com.company.test.service;

import com.company.test.dto.SubjectDTO;
import com.company.test.entity.Subject;
import com.company.test.repository.SubjectRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.BeanCreationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class SubjectService {
    private SubjectRepository subjectRepository;

    public SubjectService(SubjectRepository subjectRepository) {
        this.subjectRepository = subjectRepository;
    }

    public Page<Subject> findAll(Pageable pageable) {
        return subjectRepository.findAll(pageable);
    }

    private Subject convertDTOtoEntity(SubjectDTO subjectDTO) {
        Long subjectId = null;
        return convertDTOtoEntity(subjectId, subjectDTO);
    }

    private Subject convertDTOtoEntity(Long subjectId, SubjectDTO subjectDTO) {
        Subject subject;
        if (subjectId != null) {
            subject = findById(subjectId);
        } else {
            subject = new Subject();
        }
        BeanUtils.copyProperties(subjectDTO, subject, "id");
        return subject;
    }

    public Subject findById(Long id) {
        return subjectRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Could not find subject id=" + id));
    }

    public Subject saveDTO(SubjectDTO subjectDTO) {
        return subjectRepository.save(convertDTOtoEntity(subjectDTO));
    }

    public Subject saveDTO(Long subjectId, SubjectDTO subjectDTO) {
        return subjectRepository.save(convertDTOtoEntity(subjectId, subjectDTO));
    }

    public Subject deleteById(Long id) {
        if (subjectRepository.findSubjectById(id) != null) {
            Subject subject = subjectRepository.findSubjectById(id);
            subjectRepository.deleteById(id);
            return subject;
        } else {
            throw new EntityNotFoundException("Can not delete subject by id = " + id);
        }
    }
}

