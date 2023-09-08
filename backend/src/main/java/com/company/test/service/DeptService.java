package com.company.test.service;

import com.company.test.dto.DeptDTO;
import com.company.test.entity.Dept;
import com.company.test.repository.DeptRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.BeanCreationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class DeptService {
    private DeptRepository deptRepository;
    private OrganisationService organisationService;

    public DeptService(DeptRepository deptRepository, OrganisationService organisationService) {
        this.deptRepository = deptRepository;
        this.organisationService = organisationService;
    }

    public Page<Dept> findAll(Pageable pageable) {
        return deptRepository.findAll(pageable);
    }

    private Dept convertDTOtoEntity(DeptDTO deptDTO) {
        Long deptId = null;
        return convertDTOtoEntity(deptId, deptDTO);
    }

    private Dept convertDTOtoEntity(Long deptId, DeptDTO deptDTO) {
        Dept dept;
        if (deptId != null) {
            dept = findById(deptId);
        } else {
            dept = new Dept();
        }
        dept.setName(deptDTO.name());
        dept.setCode(deptDTO.code());
        dept.setOrganisation(organisationService.findById(deptDTO.organisationId()));

        return dept;
    }

    public Dept findById(Long id) {
        return deptRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Could not find dept id=" + id));
    }

    public Dept saveDTO(DeptDTO deptDTO) {
        return deptRepository.save(convertDTOtoEntity(deptDTO));
    }

    public Dept saveDTO(Long deptId, DeptDTO deptDTO) {
        return deptRepository.save(convertDTOtoEntity(deptId, deptDTO));
    }

    public Dept createFromDTO(DeptDTO deptDTO) {
        if (deptRepository.findDeptByName(deptDTO.name()) == null) {
            Dept dept = new Dept();
            dept.setName(deptDTO.name());
            dept.setCode(deptDTO.code());
            dept.setOrganisation(organisationService.findById(deptDTO.organisationId()));

            return deptRepository.save(dept);

        } else {
            throw new BeanCreationException("Can not create dept entity by dto " + deptDTO.toString());
        }
    }

    public Dept deleteById(Long id) {
        if (deptRepository.findDeptById(id) != null) {
            Dept dept = deptRepository.findDeptById(id);
            deptRepository.deleteById(id);
            return dept;
        } else {
            throw new EntityNotFoundException("Can not delete dept by id = " + id);
        }
    }
}

