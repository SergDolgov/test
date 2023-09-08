package com.company.test.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Min;

import java.io.Serializable;
import jakarta.validation.constraints.NotNull;

public record EmployeeDTO (
    @NotEmpty
    String name,
    String code,
    String email,
    @NotNull
    @Min(1)
    Long organisationId,
    @NotNull
    @Min(1)
    Long deptId
    )
   implements Serializable {
}

