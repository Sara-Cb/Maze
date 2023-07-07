package com.maze.services;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.maze.models.Notification;
import com.maze.repositories.NotificationRepository;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository repository;

    public Notification findNotificationById(Long id) {
        Optional<Notification> notification = repository.findById(id);
        if (notification.isPresent()) {
            return notification.get();
        } else {
            throw new NoSuchElementException("Notification not found with ID: " + id);
        }
    }

    public void saveNotification(Notification notification) {
        repository.save(notification);
    }

    public void updateNotification(Notification notification) {
        if (repository.existsById(notification.getId())) {
            repository.save(notification);
        } else {
            throw new NoSuchElementException("Notification not found with ID: " + notification.getId());
        }
    }

    public void deleteNotificationById(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
        } else {
            throw new NoSuchElementException("Notification not found with ID: " + id);
        }
    }

    public List<Notification> getAllNotifications() {
        return repository.findAll();
    }

    public boolean existsById(Long id) {
        return repository.existsById(id);
    }

}
