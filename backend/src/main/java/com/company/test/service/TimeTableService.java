package com.company.test.service;

import com.company.test.dto.TimeTableDTO;
import com.company.test.entity.TimeTable;
import com.company.test.entity.enums.DayOfWeek;
import com.company.test.entity.enums.converter.DayOfWeekConverter;
import com.company.test.repository.TimeTableRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class TimeTableService {
    private TimeTableRepository timeTableRepository;
    private DeptService deptService;
    private SubjectService subjectService;

    public TimeTableService(TimeTableRepository timeTableRepository, DeptService deptService, SubjectService subjectService) {
        this.timeTableRepository = timeTableRepository;
        this.deptService = deptService;
        this.subjectService = subjectService;
    }

    public Page<TimeTable> findAll(Pageable pageable) {
        return timeTableRepository.findAll(pageable);
    }

    private TimeTable convertDTOtoEntity(TimeTableDTO timeTableDTO) {
        Long timeTableId = null;
        return convertDTOtoEntity(timeTableId, timeTableDTO);
    }

    private TimeTable convertDTOtoEntity(Long timeTableId, TimeTableDTO timeTableDTO) {
        TimeTable timeTable;
        if (timeTableId != null) {
            timeTable = findById(timeTableId);
        } else {
            timeTable = new TimeTable();
        }
        timeTable.setOrdinal(timeTableDTO.ordinal());
        timeTable.setSubject(subjectService.findById(timeTableDTO.subjectId()));
        timeTable.setDept(deptService.findById(timeTableDTO.deptId()));
        timeTable.setDayOfWeek(DayOfWeekConverter.getById(timeTableDTO.dayOfWeek()));
        return timeTable;
    }

    public TimeTable findById(Long id) {
        return timeTableRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Could not find timeTable id=" + id));
    }

    public TimeTable saveDTO(TimeTableDTO timeTableDTO) {
        return timeTableRepository.save(convertDTOtoEntity(timeTableDTO));
    }

    public TimeTable saveDTO(Long timeTableId, TimeTableDTO timeTableDTO) {
        return timeTableRepository.save(convertDTOtoEntity(timeTableId, timeTableDTO));
    }

    public TimeTable deleteById(Long id) {
        if (timeTableRepository.findTimeTableById(id) != null) {
            TimeTable timeTable = timeTableRepository.findTimeTableById(id);
            timeTableRepository.deleteById(id);
            return timeTable;
        } else {
            throw new EntityNotFoundException("Can not delete timeTable by id = " + id);
        }
    }
}

