package com.company.test.entity.enums;

public enum DayOfWeek implements EnumDB {
    SUNDAY(0),
    MONDAY(1),
    TUESDAY(2),
    WEDNESDAY(3),
    THURSDAY(4),
    FRIDAY(5),
    SATURDAY(6);

    private Integer id;

    DayOfWeek(Integer id) {
        this.id = id;
    }

    @Override
    public Integer getId() {
        return id;
    }
}
