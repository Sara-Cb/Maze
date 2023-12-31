package com.maze.models;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.maze.enumerations.Profession;
import com.maze.enumerations.Skill;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "creatives")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Creative {
    @Id
    @Column(nullable = false, unique = true)
    @NotBlank
    private String username;

    @Column(nullable = false, unique = true)
    @NotBlank
    @Email
    private String email;

    @Column(nullable = false)
    @NotBlank
    private String password;

    @Column(nullable = false)
    @NotNull
    private Timestamp registrationDate;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JoinTable(name = "creatives_roles", joinColumns = @JoinColumn(name = "creative_username", referencedColumnName = "username"), inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "role"))
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "role")
    @JsonIdentityReference(alwaysAsId = true)
    @JsonProperty("roles")
    private Set<Role> roles = new HashSet<>();

    @Column(nullable = false)
    @NotBlank
    private String firstname;

    @Column(nullable = false)
    @NotBlank
    private String lastname;

    @Column(name = "stage_name")
    private String stageName;

    @Column
    private String bio;

    @Column
    private String city;

    @Column
    private String state;

    @Column
    private String image;

    @JsonIgnore
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "portfolio_id")
    private Portfolio portfolio;

    @ElementCollection
    @Enumerated(EnumType.STRING)
    private Set<Skill> skills = new HashSet<>();

    @ElementCollection
    @Enumerated(EnumType.STRING)
    @NotEmpty
    private Set<Profession> professions = new HashSet<>();

}
