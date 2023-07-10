package com.maze.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.maze.models.Notification;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
}
