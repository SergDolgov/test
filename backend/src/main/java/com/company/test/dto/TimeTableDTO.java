package com.company.test.dto;

import java.io.Serializable;

public record TimeTableDTO(Long ordinal, Integer dayOfWeek, Long deptId, Long subjectId) implements Serializable { }

