package com.maze.security;

import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.maze.models.Creative;
import com.maze.services.CreativeService;

@Service
public class CreativeDetailsService implements UserDetailsService {

        @Autowired
        private CreativeService service;

        @Override
        public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
                Creative creative = service.findCreativeByUsername(username);
                if (creative == null) {
                        throw new UsernameNotFoundException("Creative not found with username: " + username);
                }

                Set<GrantedAuthority> authorities = creative.getRoles().stream()
                                .map(role -> new SimpleGrantedAuthority(role.getRole().toString()))
                                .collect(Collectors.toSet());

                return new org.springframework.security.core.userdetails.User(creative.getUsername(),
                                creative.getPassword(),
                                authorities);
        }

}
