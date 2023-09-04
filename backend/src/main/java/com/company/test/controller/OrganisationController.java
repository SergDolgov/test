package com.company.test.controller;

import com.company.test.annotation.Statistic;
import com.company.test.dto.OrganisationDTO;
import com.company.test.entity.Organisation;
import com.company.test.service.OrganisationService;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

//@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/organisations")
public class OrganisationController {

    private OrganisationService organisationService;

    public OrganisationController(OrganisationService organisationService) {
        this.organisationService = organisationService;
    }

    @Statistic
    @GetMapping
    public Page<Organisation> getAllOrganisations(@PageableDefault Pageable pageable) {
        return organisationService.findAll(pageable);
    }

    @Statistic
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/{name}")
    public Organisation createOrganisation(@PathVariable @Size(min = 4, max = 50) String name) {
        return organisationService.createFromDTO(new OrganisationDTO(name));
    }

    @Statistic
    @GetMapping("/{organisationId}")
    public Organisation getOrganisation(@PathVariable Long organisationId) {
        return organisationService.findById(organisationId);
    }

    @Statistic
    @PutMapping("/{organisationId}")
    public Organisation saveOrganisation(@PathVariable Long organisationId,
                               @Valid @RequestBody OrganisationDTO organisationDTO) {
        return organisationService.saveDTO(organisationId, organisationDTO);
    }

    @Statistic
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{organisationId}")
    public void deleteOrganisationById(@PathVariable @Min(1) Long organisationId) {
        organisationService.deleteById(organisationId);
    }
}

