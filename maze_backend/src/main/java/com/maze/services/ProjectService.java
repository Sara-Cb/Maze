package com.maze.services;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.maze.models.Project;
import com.maze.repositories.ProjectRepository;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository repository;

    public Project findProjectById(Long id) {
        Optional<Project> project = repository.findById(id);
        if (project.isPresent()) {
            return project.get();
        } else {
            throw new NoSuchElementException("Project not found with ID: " + id);
        }
    }

    public void saveProject(Project project) {
        repository.save(project);
    }

    public void updateProject(Project project) {
        if (repository.existsById(project.getId())) {
            repository.save(project);
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

}
