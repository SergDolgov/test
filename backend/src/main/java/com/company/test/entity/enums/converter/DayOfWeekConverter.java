package com.company.test.entity.enums.converter;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

//import java.time.DayOfWeek;

import com.company.test.entity.enums.DayOfWeek;

@Converter
public class DayOfWeekConverter
        extends EnumDBConverter<DayOfWeek>
        implements AttributeConverter<DayOfWeek, Integer> {

    public DayOfWeekConverter() {
        super(DayOfWeek.class);
    }

    public static DayOfWeek getById(Integer id) {
        return getById(DayOfWeek.class, id);
    }
}
