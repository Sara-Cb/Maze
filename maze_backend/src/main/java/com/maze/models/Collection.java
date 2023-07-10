package com.maze.models;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.maze.enumerations.Category;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
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
@Table(name = "collections")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Collection {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "creative_id", referencedColumnName = "username", nullable = false)
	@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "username")
	@JsonIdentityReference(alwaysAsId = true)
	@JsonProperty("author")
	private Creative author;

	@ManyToOne
	@JoinColumn(name = "portfolio", nullable = false)
	@JsonIgnore
	private Portfolio portfolio;

	@Column(nullable = false)
	private Timestamp createdAt;

	@Column
	private Timestamp updatedAt;

	@Column(nullable = false)
	private String title;

	private String description;

	@Enumerated(EnumType.STRING)
	private Category category;

	@Column(name = "cover")
	private String coverImage;

	@OneToMany(mappedBy = "collection", fetch = FetchType.EAGER)
	private List<Elaborate> elaborates = new ArrayList<>();

	@ElementCollection
	private Set<String> keywords = new HashSet<String>();

	@ManyToOne
	@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "username")
	@JsonIdentityReference(alwaysAsId = true)
	@JsonProperty("project")
	private Project project = null;

	@Column(name = "single_element", nullable = false)
	boolean singleElement;
}
