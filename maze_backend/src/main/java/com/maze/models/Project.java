package com.maze.models;
/*
 * import java.sql.Timestamp;
 * import java.util.ArrayList;
 * import java.util.List;
 * 
 * import jakarta.persistence.CascadeType;
 * import jakarta.persistence.Column;
 * import jakarta.persistence.Entity;
 * import jakarta.persistence.FetchType;
 * import jakarta.persistence.GeneratedValue;
 * import jakarta.persistence.GenerationType;
 * import jakarta.persistence.Id;
 * import jakarta.persistence.JoinColumn;
 * import jakarta.persistence.JoinTable;
 * import jakarta.persistence.ManyToMany;
 * import jakarta.persistence.ManyToOne;
 * import jakarta.persistence.OneToMany;
 * import jakarta.persistence.Table;
 * import lombok.AllArgsConstructor;
 * import lombok.Data;
 * import lombok.NoArgsConstructor;
 * 
 * @Entity
 * 
 * @Table(name = "projects")
 * 
 * @Data
 * 
 * @NoArgsConstructor
 * 
 * @AllArgsConstructor
 * public class Project {
 * 
 * @Id
 * 
 * @GeneratedValue(strategy = GenerationType.IDENTITY)
 * private Long id;
 * 
 * @ManyToOne
 * 
 * @JoinColumn(name = "author", referencedColumnName = "username", nullable =
 * false)
 * private Creative author;
 * 
 * @ManyToOne
 * private Portfolio portfolio;
 * 
 * @Column(nullable = false)
 * private Timestamp createdAt;
 * 
 * private Timestamp updatedAt;
 * 
 * @Column(nullable = false)
 * private String title;
 * 
 * @Column(nullable = false)
 * private String description;
 * 
 * @Column(name = "cover")
 * private String coverImage;
 * 
 * @OneToMany(mappedBy = "project")
 * private List<ProjectPosition> openPositions = new ArrayList<>();
 * 
 * @ManyToMany
 * 
 * @JoinTable(name = "project_collaborators", joinColumns = @JoinColumn(name =
 * "project_id"), inverseJoinColumns = @JoinColumn(name = "collaborator",
 * referencedColumnName = "username"))
 * private List<Creative> collaborators = new ArrayList<>();
 * 
 * @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, fetch =
 * FetchType.EAGER)
 * private List<Collection> collections = new ArrayList<>();
 * 
 * }
 */
