package com.maze.models;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JoinTable(name = "creatives_roles", joinColumns = @JoinColumn(name = "creative_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "role"))
    private Set<Role> roles = new HashSet<>();

    @Column(name = "stage_name")
    private String stageName;

    @Column
    private String firstname;

    @Column
    private String lastname;

    @OneToOne(cascade = CascadeType.ALL)
    private Portfolio portfolio;

    @Column
    private String bio;

    @Column
    private String city;

    @Column
    private String state;

    @Column
    private String image;

    @ElementCollection
    @Enumerated(EnumType.STRING)
    private Set<Skill> skills = new HashSet<>();

    @ElementCollection
    @Enumerated(EnumType.STRING)
    private Set<Profession> professions = new HashSet<>();

    @OneToMany(mappedBy = "follower", fetch = FetchType.EAGER)
    private List<Follow> follows = new ArrayList<>();
}
