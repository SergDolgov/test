package com.company.test.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "dept")
public class Dept extends AbstractEntity{

        private String name;
        private String code;
        @NotNull
        @ManyToOne
        @JoinColumn(name = "organisation_id", nullable = false)
        private Organisation organisation;

        public String getName() {
                return name;
        }

        public void setName(String name) {
                this.name = name;
        }

        public String getCode() {
                return code;
        }

        public void setCode(String code) {
                this.code = code;
        }

        public Organisation getOrganisation() {
                return organisation;
        }

        public void setOrganisation(Organisation organisation) {
                this.organisation = organisation;
        }

}
