package com.maze.models;

import java.util.Set;

import com.maze.enumerations.Profession;
import com.maze.enumerations.Skill;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "profiles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Profile {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	@Column(nullable = false, name = "stage_name")
	private String stageName;
    
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
    private Set<Skill> skills;
    
	@ElementCollection
    @Enumerated(EnumType.STRING)
    private Set<Profession> professions;
	
	@OneToOne(mappedBy = "profile")
	@JoinColumn(name = "creative", referencedColumnName = "username", nullable = false)
	private Creative creative;

}
