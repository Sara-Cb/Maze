package com.maze.services;

import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.maze.models.Elaborate;
import com.maze.models.PortfolioItem;
import com.maze.repositories.ElaborateRepository;
import com.maze.repositories.PortfolioItemRepository;

@Service
public class ElaborateService {

    @Autowired
    private ElaborateRepository repository;

    @Autowired
    private PortfolioItemService PIService;

    public Elaborate findElaborateById(Long id) {
        Optional<Elaborate> elaborate = repository.findById(id);
        if (elaborate.isPresent()) {
            return elaborate.get();
        } else {
            throw new NoSuchElementException("Elaborate not found with ID: " + id);
        }
    }

    public void saveElaborate(Elaborate elaborate) {
        if (elaborate.getId() != null) {
            if (elaborate.getCollection() == null && elaborate.getProject() == null) {
                if (PIService.existsByElaborateId(elaborate.getId())) {
                    PortfolioItem portfolioItem = PIService.findPortfolioItemByElaborateId(elaborate.getId());
                    portfolioItem.setUpdatedAt(LocalDate.now());
                    PIService.updatePortfolioItem(portfolioItem);
                } else {
                    // capisci che devi fare qua
                    PortfolioItem portfolioItem = new PortfolioItem();
                    portfolioItem.setCreatedAt(LocalDate.now());
                    portfolioItem.setElaborate(elaborate);
                    PIService.savePortfolioItem(portfolioItem);
                }
            } else {

            }
        } else {
            repository.save(elaborate);
        }

    }

    public void updateElaborate(Elaborate elaborate) {
        if (repository.existsById(elaborate.getId())) {
            repository.save(elaborate);
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

}
