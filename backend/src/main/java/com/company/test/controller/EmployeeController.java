package com.company.test.controller;

import com.company.test.annotation.Statistic;
import com.company.test.dto.EmployeeDTO;
import com.company.test.entity.Employee;
import com.company.test.service.EmployeeService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @Statistic
    @GetMapping
    public Page<Employee> getAllEmployees(@PageableDefault Pageable pageable) {
        return employeeService.findAll(pageable);
    }

    @Statistic
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public Employee createEmployee(@RequestBody EmployeeDTO employeeDTO) {
        return employeeService.saveDTO(employeeDTO);
    }

    @Statistic
    @GetMapping("/{employeeId}")
    public Employee getEmployee(@PathVariable Long employeeId) {
        return employeeService.findById(employeeId);
    }

    @Statistic
    @PutMapping("/{employeeId}")
    public Employee saveEmployee(@PathVariable Long employeeId,
                               @Valid @RequestBody EmployeeDTO employeeDTO) {
        return employeeService.saveDTO(employeeId, employeeDTO);
    }

    @Statistic
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{employeeId}")
    public void deleteEmployeeById(@PathVariable @Min(1) Long employeeId) {
        employeeService.deleteById(employeeId);
    }
}

