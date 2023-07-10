package com.maze.models;

import java.util.ArrayList;
import java.util.List;

import com.maze.enumerations.Profession;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "project_positions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectPosition {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "project_id", referencedColumnName = "id")
    private Project project;

    @Enumerated(EnumType.STRING)
    private Profession profession;

    @OneToMany(mappedBy = "projectPosition")
    private List<ProjectApplication> applications = new ArrayList<>();

}
