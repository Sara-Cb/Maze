package com.maze.services;

import java.sql.Timestamp;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.maze.models.Elaborate;
import com.maze.repositories.ElaborateRepository;

@Service
public class ElaborateService {

    @Autowired
    private ElaborateRepository repository;

    Timestamp now = new Timestamp(System.currentTimeMillis());

    public Elaborate findElaborateById(Long id) {
        Optional<Elaborate> elaborate = repository.findById(id);
        if (elaborate.isPresent()) {
            return elaborate.get();
        } else {
            throw new NoSuchElementException("Elaborate not found with ID: " + id);
        }
    }

    public Elaborate saveElaborate(Elaborate elaborate) {
        if (elaborate.getId() == null) {
            elaborate.setCreatedAt(now);
        }
        if (elaborate.getCollection() != null) {
            elaborate.getCollection().setUpdatedAt(now);
        }
        return repository.save(elaborate);
    }

    public Elaborate updateElaborate(Elaborate elaborate) {
        if (repository.existsById(elaborate.getId())) {
            elaborate.setUpdatedAt(now);
            return repository.save(elaborate);
        } else {
            throw new NoSuchElementException("Elaborate not found with ID: " + elaborate.getId());
        }
    }

    public void deleteElaborateById(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
        } else {
            throw new NoSuchElementException("Elaborate not found with ID: " + id);
        }
    }

    public List<Elaborate> getAllElaborates() {
        return repository.findAll();
    }

    public boolean existsById(Long id) {
        return repository.existsById(id);
    }

}
