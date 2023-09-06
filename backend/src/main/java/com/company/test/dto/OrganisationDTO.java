package com.company.test.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.io.Serializable;
import java.math.BigDecimal;

public class OrganisationDTO implements Serializable {

    @NotEmpty
    private String name;
    private String code;

    public OrganisationDTO() {
    }

    public OrganisationDTO(String name) {
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

    @Override
    public String toString() {
        return "OrganisationDTO{" +
                "name='" + name + '\'' +
                "code='" + code + '\'' +
                '}';
    }

}

