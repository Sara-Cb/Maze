package com.maze.models;

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
@Table(name = "follows")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Follow {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "follower", referencedColumnName = "username")
    private Creative follower;

    @ManyToOne
    @JoinColumn(name = "followed", referencedColumnName = "username")
    private Creative followed;

    public Follow(Creative follower, Creative followed) {
        this.follower = follower;
        this.followed = followed;
    }

}
