package com.maze.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.maze.models.Creative;
import com.maze.models.Follow;

public interface FollowRepository extends JpaRepository<Follow, Long> {

    List<Follow> findByFollower(Creative creative);

    Follow findByFollowerAndFollowed(Creative follower, Creative followed);

    boolean existsByFollowerAndFollowed(Creative follower, Creative followed);

}
