package com.maze.models;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "portfolio")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Portfolio {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@OneToOne(mappedBy = "portfolio")
	@JoinColumn(name = "creative", referencedColumnName = "username", nullable = false)
	private Creative creative;

	@OneToMany(mappedBy = "portfolio", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	private List<Collection> collection = new ArrayList<>();

	@OneToMany(mappedBy = "portfolio", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	private List<Project> project = new ArrayList<>();

}
