package com.company.test.service;

import com.company.test.dto.OrganisationDTO;
import com.company.test.entity.Organisation;
import com.company.test.repository.OrganisationRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.BeanCreationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import java.util.HashSet;

@Service
public class OrganisationService {
    private OrganisationRepository organisationRepository;

    public OrganisationService(OrganisationRepository organisationRepository) {
        this.organisationRepository = organisationRepository;
    }

    public Page<Organisation> findAll(Pageable pageable) {
        return organisationRepository.findAll(pageable);
    }

    private Organisation convertDTOtoEntity(OrganisationDTO organisationDTO) {
        Long organisationId = null;
        return convertDTOtoEntity(organisationId, organisationDTO);
    }

    private Organisation convertDTOtoEntity(Long organisationId, OrganisationDTO organisationDTO) {
        Organisation organisation;
        if (organisationId != null) {
            organisation = findById(organisationId);
        } else {
            organisation = new Organisation();
        }
        BeanUtils.copyProperties(organisationDTO, organisation, "id");
        return organisation;
    }

    public Organisation findById(Long id) {
        return organisationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Could not find organisation id=" + id));
    }

    public Organisation saveDTO(OrganisationDTO organisationDTO) {
        return organisationRepository.save(convertDTOtoEntity(organisationDTO));
    }

    public Organisation saveDTO(Long organisationId, OrganisationDTO organisationDTO) {
        return organisationRepository.save(convertDTOtoEntity(organisationId, organisationDTO));
    }

    public Organisation createFromDTO(OrganisationDTO organisationDTO) {
        if (organisationRepository.findOrganisationByName(organisationDTO.name()) == null) {
            Organisation organisation = new Organisation();
            BeanUtils.copyProperties(organisationDTO, organisation, "id");
            return organisationRepository.save(organisation);
        } else {
            throw new BeanCreationException("Can not create organisation entity by dto " + organisationDTO.toString());
        }
    }

    public Organisation deleteById(Long id) {
        if (organisationRepository.findOrganisationById(id) != null) {
            Organisation organisation = organisationRepository.findOrganisationById(id);
            organisationRepository.deleteById(id);
            return organisation;
        } else {
            throw new EntityNotFoundException("Can not delete organisation by id = " + id);
        }
    }
}

