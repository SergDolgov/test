package com.company.test.entity.enums.converter;

import com.company.test.entity.enums.EnumDB;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.EntityNotFoundException;
import java.util.Arrays;

public abstract class EnumDBConverter<E extends Enum & EnumDB> implements AttributeConverter<E, Integer> {

    private Class<E> enumClass;

    EnumDBConverter(Class<E> enumClass) {
        this.enumClass = enumClass;
    }

    @Override
    public Integer convertToDatabaseColumn(E e) {
        if (e == null) {
            return null;
        }
        return e.getId();
    }

    @Override
    public E convertToEntityAttribute(Integer id) {
        return getById(enumClass, id);
    }

    static <E extends Enum & EnumDB> E getById(Class<E> clazz, Integer id) {
        return Arrays.stream(clazz.getEnumConstants())
                .filter(a -> a.getId().equals(id)).findFirst()
                .orElseThrow(() -> new EntityNotFoundException("Could not find " +
                        clazz.getSimpleName() + " id=" + id));
    }
}


