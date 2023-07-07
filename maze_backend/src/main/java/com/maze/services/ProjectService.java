package com.maze.services;

import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.maze.enumerations.PortfolioItemType;
import com.maze.models.PortfolioItem;
import com.maze.models.Project;
import com.maze.repositories.ProjectRepository;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository repository;

    @Autowired
    private PortfolioItemService PortfolioItemService;

    public Project findProjectById(Long id) {
        Optional<Project> project = repository.findById(id);
        if (project.isPresent()) {
            return project.get();
        } else {
            throw new NoSuchElementException("Project not found with ID: " + id);
        }
    }

    public void saveProject(Project project) {
        if (project.getId() != null) {
            if (PortfolioItemService.existsByProjectId(project.getId())) {
                repository.save(project);
                PortfolioItem portfolioItem = PortfolioItemService.findPortfolioItemByProjectId(project.getId());
                portfolioItem.setUpdatedAt(LocalDate.now());
                PortfolioItemService.updatePortfolioItem(portfolioItem);
            } else {
                PortfolioItem portfolioItem = new PortfolioItem();
                portfolioItem.setCreatedAt(LocalDate.now());
                portfolioItem.setProject(project);
                portfolioItem.setType(PortfolioItemType.PROJECT);
                PortfolioItemService.savePortfolioItem(portfolioItem);
            }
        } else {
            PortfolioItem portfolioItem = new PortfolioItem();
            portfolioItem.setCreatedAt(LocalDate.now());
            portfolioItem.setProject(project);
            portfolioItem.setType(PortfolioItemType.PROJECT);
            PortfolioItemService.savePortfolioItem(portfolioItem);
        }
    }

    public Project updateProject(Project project) {
        if (repository.existsById(project.getId())) {
            return repository.save(project);
        } else {
            throw new NoSuchElementException("Project not found with ID: " + project.getId());
        }
    }

    public void deleteProjectById(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
        } else {
            throw new NoSuchElementException("Project not found with ID: " + id);
        }
    }

    public List<Project> getAllProjects() {
        return repository.findAll();
    }

    public boolean existsById(Long id) {
        return repository.existsById(id);
    }

}
