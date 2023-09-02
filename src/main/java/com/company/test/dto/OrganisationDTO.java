package com.company.test.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.io.Serializable;
import java.math.BigDecimal;

public class OrganisationDTO implements Serializable {

    @NotEmpty
    private String name;

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

    @Override
    public String toString() {
        return "OrganisationDTO{" +
                "name='" + name + '\'' +
                '}';
    }

}

