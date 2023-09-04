package com.company.test.repository;

import com.company.test.entity.Organisation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrganisationRepository extends JpaRepository<Organisation, Long> {
    Organisation findOrganisationById(Long id);

    Organisation findOrganisationByName(String name);

}
