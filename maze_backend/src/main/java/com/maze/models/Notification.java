package com.maze.models;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "notifications")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDateTime notificationDateTime;

    @ManyToOne
    @JoinColumn(name = "sender", referencedColumnName = "username")
    private Creative sender;

    @ManyToOne
    @JoinColumn(name = "receiver", referencedColumnName = "username")
    private Creative receiver;

    @Column(nullable = false)
    private String message;

    private boolean read;

}
