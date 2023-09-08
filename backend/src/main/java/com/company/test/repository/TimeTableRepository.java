package com.company.test.repository;

import com.company.test.entity.TimeTable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TimeTableRepository extends JpaRepository<TimeTable, Long> {
    TimeTable findTimeTableById(Long id);
}
