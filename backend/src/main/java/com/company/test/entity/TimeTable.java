package com.company.test.entity;

import com.company.test.entity.enums.DayOfWeek;
import com.company.test.entity.enums.converter.DayOfWeekConverter;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "timetable")
public class TimeTable extends AbstractEntity {
    private Long ordinal;
    @NotNull
    @Convert(converter = DayOfWeekConverter.class)
    @Column(name = "day_of_week_id", nullable = false)
    private DayOfWeek dayOfWeek;
    @NotNull
    @ManyToOne
    @JoinColumn(name = "dept_id", nullable = false)
    private Dept dept;
    @NotNull
    @ManyToOne
    @JoinColumn(name = "subject_id", nullable = false)
    private Subject subject;

    public Long getOrdinal() {
        return ordinal;
    }

    public void setOrdinal(Long ordinal) {
        this.ordinal = ordinal;
    }

    public DayOfWeek getDayOfWeek() {
        return dayOfWeek;
    }

    public void setDayOfWeek(DayOfWeek dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }

    public Dept getDept() {
        return dept;
    }

    public void setDept(Dept dept) {
        this.dept = dept;
    }

    public Subject getSubject() {
        return subject;
    }

    public void setSubject(Subject subject) {
        this.subject = subject;
    }
}