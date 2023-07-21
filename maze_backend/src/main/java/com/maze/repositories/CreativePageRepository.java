package com.maze.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import com.maze.enumerations.Profession;
import com.maze.enumerations.Skill;
import com.maze.models.Creative;

import java.util.Set;

public interface CreativePageRepository extends PagingAndSortingRepository<Creative, Long> {

        Page<Creative> findByUsernameContainingOrFirstnameContainingOrLastnameContainingOrStageNameContaining(
                        String username, String firstname, String lastname, String stagename, Pageable pageable);

        Page<Creative> findByCityAndState(String city, String state, Pageable pageable);

        Page<Creative> findByProfessionsIn(Set<Profession> profession, Pageable pageable);

        @Query("SELECT c FROM Creative c WHERE :skills MEMBER OF c.skills")
        Page<Creative> findBySkillsContainingAll(@Param("skills") Set<Skill> skills, Pageable pageable);

}
