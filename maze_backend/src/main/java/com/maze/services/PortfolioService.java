package com.maze.services;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.maze.models.Portfolio;
import com.maze.repositories.PortfolioRepository;

@Service
public class PortfolioService {

    @Autowired
    private PortfolioRepository repository;

    public Portfolio findPortfolioById(Long id) {
        Optional<Portfolio> portfolio = repository.findById(id);
        if (portfolio.isPresent()) {
            return portfolio.get();
        } else {
            throw new NoSuchElementException("Portfolio not found with ID: " + id);
        }
    }

    public void savePortfolio(Portfolio portfolio) {
        repository.save(portfolio);
    }

    public void updatePortfolio(Portfolio portfolio) {
        if (repository.existsById(portfolio.getId())) {
            repository.save(portfolio);
        } else {
            throw new NoSuchElementException("Portfolio not found with ID: " + portfolio.getId());
        }
    }

    public void deletePortfolioById(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
        } else {
            throw new NoSuchElementException("Portfolio not found with ID: " + id);
        }
    }

    public List<Portfolio> getAllPortfolios() {
        return repository.findAll();
    }

    public boolean existsById(Long id) {
        return repository.existsById(id);
    }

}
