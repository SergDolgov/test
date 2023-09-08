package com.company.test.controller;

import com.company.test.annotation.Statistic;
import com.company.test.dto.TimeTableDTO;
import com.company.test.entity.TimeTable;
import com.company.test.service.TimeTableService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/time_tables")
public class TimeTableController {

    private TimeTableService timeTableService;

    public TimeTableController(TimeTableService timeTableService) {
        this.timeTableService = timeTableService;
    }

    @Statistic
    @GetMapping
    public Page<TimeTable> getAllTimeTables(@PageableDefault Pageable pageable) {
        return timeTableService.findAll(pageable);
    }

    @Statistic
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public TimeTable createTimeTable(@RequestBody TimeTableDTO timeTableDTO) {
        return timeTableService.saveDTO(timeTableDTO);
    }

    @Statistic
    @GetMapping("/{timeTableId}")
    public TimeTable getTimeTable(@PathVariable Long timeTableId) {
        return timeTableService.findById(timeTableId);
    }

    @Statistic
    @PutMapping("/{timeTableId}")
    public TimeTable saveTimeTable(@PathVariable Long timeTableId,
                               @Valid @RequestBody TimeTableDTO timeTableDTO) {
        return timeTableService.saveDTO(timeTableId, timeTableDTO);
    }

    @Statistic
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{timeTableId}")
    public void deleteTimeTableById(@PathVariable @Min(1) Long timeTableId) {
        timeTableService.deleteById(timeTableId);
    }
}

