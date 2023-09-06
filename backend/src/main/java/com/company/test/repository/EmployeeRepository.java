package com.company.test.repository;

import com.company.test.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    Employee findEmployeeById(Long id);

    Employee findEmployeeByName(String name);

}
