package com.maze.services;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.maze.enumerations.RoleType;
import com.maze.models.Role;
import com.maze.repositories.RoleRepository;

@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    public Role findRoleById(Long id) {
        Optional<Role> role = roleRepository.findById(id);
        if (role.isPresent()) {
            return role.get();
        } else {
            throw new NoSuchElementException(
                    "Role not found with ID: " + id);
        }
    }

    public void saveRole(Role role) {
        roleRepository.save(role);
    }

    public void updateRole(Role role) {
        if (roleRepository.existsById(role.getId())) {
            roleRepository.save(role);
        } else {
            throw new NoSuchElementException(
                    "Role not found with ID: " + role.getId());
        }
    }

    public void deleteRoleById(Long id) {
        if (roleRepository.existsById(id)) {
            roleRepository.deleteById(id);
        } else {
            throw new NoSuchElementException(
                    "Role not found with ID: " + id);
        }
    }

    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    public boolean existsById(Long id) {
        return roleRepository.existsById(id);
    }

    public Role findRoleByType(RoleType role) {
        return roleRepository.findByRole(role).get();
    }

    public boolean existsByType(RoleType role) {
        return roleRepository.existsByRole(role);
    }

}
