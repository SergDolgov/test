package com.company.test.controller;

import com.company.test.annotation.Statistic;
import com.company.test.dto.DeptDTO;
import com.company.test.entity.Dept;
import com.company.test.service.DeptService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/depts")
public class DeptController {

    private DeptService deptService;

    public DeptController(DeptService deptService) {
        this.deptService = deptService;
    }

    @Statistic
    @GetMapping
    public Page<Dept> getAllDepts(@PageableDefault Pageable pageable) {
        return deptService.findAll(pageable);
    }

    @Statistic
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public Dept createDept(@RequestBody DeptDTO deptDTO) {
        return deptService.saveDTO(deptDTO);
    }

    @Statistic
    @GetMapping("/{deptId}")
    public Dept getDept(@PathVariable Long deptId) {
        return deptService.findById(deptId);
    }

    @Statistic
    @PutMapping("/{deptId}")
    public Dept saveDept(@PathVariable Long deptId,
                                 @Valid @RequestBody DeptDTO deptDTO) {
        return deptService.saveDTO(deptId, deptDTO);
    }

    @Statistic
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{deptId}")
    public void deleteDeptById(@PathVariable @Min(1) Long deptId) {
        deptService.deleteById(deptId);
    }
}

