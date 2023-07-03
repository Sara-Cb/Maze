package com.maze.interfaces;

import com.maze.dtos.LoginDto;
import com.maze.dtos.RegisterDto;

public interface AuthServiceInterface {

    String login(LoginDto loginDto);

    String register(RegisterDto registerDto);

}
