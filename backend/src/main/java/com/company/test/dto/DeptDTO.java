package com.company.test.dto;

import java.io.Serializable;

public record DeptDTO(String name, String code, Long organisationId) implements Serializable { }
