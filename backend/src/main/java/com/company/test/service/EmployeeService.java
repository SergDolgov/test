package com.company.test.service;

import com.company.test.dto.EmployeeDTO;
import com.company.test.entity.Employee;
import com.company.test.repository.EmployeeRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.BeanCreationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class EmployeeService {
    private final EmployeeRepository employeeRepository;
    private final OrganisationService organisationService;
    private final DeptService deptService;

    public EmployeeService(EmployeeRepository employeeRepository, OrganisationService organisationService, DeptService deptService) {
        this.employeeRepository = employeeRepository;
        this.organisationService = organisationService;
        this.deptService = deptService;
    }

    public Page<Employee> findAll(Pageable pageable) {
        return employeeRepository.findAll(pageable);
    }

    private Employee convertDTOtoEntity(EmployeeDTO employeeDTO) {
        Long employeeId = null;
        return convertDTOtoEntity(employeeId, employeeDTO);
    }

    private Employee convertDTOtoEntity(Long employeeId, EmployeeDTO employeeDTO) {
        Employee employee;
        if (employeeId != null) {
            employee = findById(employeeId);
        } else {
            employee = new Employee();
        }
        BeanUtils.copyProperties(employeeDTO, employee, "id");
        employee.setDept(deptService.findById(employeeDTO.deptId()));
        employee.setOrganisation(organisationService.findById(employeeDTO.organisationId()));

        return employee;
    }

    public Employee findById(Long id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Could not find employee id=" + id));
    }

    public Employee saveDTO(EmployeeDTO employeeDTO) {
        return employeeRepository.save(convertDTOtoEntity(employeeDTO));
    }

    public Employee saveDTO(Long employeeId, EmployeeDTO employeeDTO) {
        return employeeRepository.save(convertDTOtoEntity(employeeId, employeeDTO));
    }

    public Employee createFromDTO(EmployeeDTO employeeDTO) {
        if (employeeRepository.findEmployeeByName(employeeDTO.name()) == null) {
            Employee employee = new Employee();
            BeanUtils.copyProperties(employeeDTO, employee, "id");
            employee.setDept(deptService.findById(employeeDTO.deptId()));
            employee.setOrganisation(organisationService.findById(employeeDTO.organisationId()));

            return employeeRepository.save(employee);
        } else {
            throw new BeanCreationException("Can not create employee entity by dto " + employeeDTO.toString());
        }
    }

    public Employee deleteById(Long id) {
        if (employeeRepository.findEmployeeById(id) != null) {
            Employee employee = employeeRepository.findEmployeeById(id);
            employeeRepository.deleteById(id);
            return employee;
        } else {
            throw new EntityNotFoundException("Can not delete employee by id = " + id);
        }
    }
}

