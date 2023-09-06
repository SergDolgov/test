package com.company.test.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Min;

import java.io.Serializable;
import jakarta.validation.constraints.NotNull;

public class EmployeeDTO implements Serializable {

    @NotEmpty
    private String name;
    private String code;
    private String email;
    @NotNull
    @Min(1)
    private Long organisationId;

    public EmployeeDTO() {
    }

    public EmployeeDTO(String name) {
        this.name = name;
    }
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getOrganisationId() {
        return organisationId;
    }

    public void setOrganisationId(Long organisationId) {
        this.organisationId = organisationId;
    }

    @Override
    public String toString() {
        return "EmployeeDTO{" +
                "name='" + name + '\'' +
                "code='" + code + '\'' +
                "email='" + email + '\'' +
                "organisationId='" + organisationId + '\'' +
                '}';
    }
}

