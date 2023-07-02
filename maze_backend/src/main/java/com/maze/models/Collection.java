package com.maze.models;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
	private Creative author;
	
	@Column(nullable = false)
	private LocalDateTime publication;

	@ManyToOne
	private Portfolio portfolio;

	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private Category category;

	@Column(nullable = false)
	private String title;

	private String description;

	@Column(name = "cover")
	private String coverImage;

	@OneToMany(mappedBy = "collection", fetch = FetchType.EAGER)
	private List<Elaborate> elaborates = new ArrayList<Elaborate>();

	@ElementCollection
	private Set<String> keywords = new HashSet<String>();

	//private List<Creative> collaborators = new ArrayList<Creative>();

}
