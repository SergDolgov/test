package com.company.test.dto;

import jakarta.validation.constraints.NotEmpty;
import java.io.Serializable;

public record OrganisationDTO(@NotEmpty String name, String code) implements Serializable { }

