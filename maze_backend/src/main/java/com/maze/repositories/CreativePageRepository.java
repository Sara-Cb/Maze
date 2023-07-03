package com.maze.repositories;

import java.time.LocalDate;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.maze.models.Creative;

public interface CreativePageRepository extends PagingAndSortingRepository<Creative, String> {

}
