package com.maze.repositories;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.maze.models.Creative;

public interface CreativePageRepository extends PagingAndSortingRepository<Creative, String> {

}
