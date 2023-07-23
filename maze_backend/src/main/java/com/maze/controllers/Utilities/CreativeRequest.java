package com.maze.controllers.Utilities;

import java.util.Set;

import com.maze.enumerations.Profession;
import com.maze.enumerations.Skill;

public class CreativeRequest {
    public String username;
    public String firstname;
    public String lastname;
    public String stageName;
    public String bio;
    public String city;
    public String state;
    public Set<Skill> skills;
    public Set<Profession> professions;
}
