package com.maze.runners;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.maze.enumerations.Profession;
import com.maze.enumerations.RoleType;
import com.maze.models.Portfolio;
import com.maze.models.Role;
import com.maze.models.Creative;
import com.maze.services.AuthService;
import com.maze.services.RoleService;
import com.maze.services.CreativeService;

@Component
public class AuthRunner implements ApplicationRunner {

	@Autowired
	RoleService roleService;

	@Autowired
	CreativeService creativeService;

	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	AuthService authService;

	private Set<Role> adminRole;

	private Set<Role> moderatorRole;

	private Set<Role> userRole;

	@Override
	public void run(ApplicationArguments args) throws Exception {
		System.out.println("Run...");
		setRoleDefault();
		saveAdminDefault();
		saveModeratorDefault();
		saveUserDefault();
	}

	private void setRoleDefault() {
		Role admin = new Role();
		Role moderator = new Role();
		Role user = new Role();

		admin.setRole(RoleType.ROLE_ADMIN);
		moderator.setRole(RoleType.ROLE_MODERATOR);
		user.setRole(RoleType.ROLE_USER);

		if (!roleService.existsByType(RoleType.ROLE_ADMIN)) {
			roleService.saveRole(admin);
		}

		if (!roleService.existsByType(RoleType.ROLE_MODERATOR)) {
			roleService.saveRole(moderator);
		}

		if (!roleService.existsByType(RoleType.ROLE_USER)) {
			roleService.saveRole(user);
		}

		adminRole = new HashSet<Role>();
		adminRole.add(admin);
		adminRole.add(moderator);
		adminRole.add(user);

		moderatorRole = new HashSet<Role>();
		moderatorRole.add(moderator);
		moderatorRole.add(user);

		userRole = new HashSet<Role>();
		userRole.add(user);
	}

	public void saveAdminDefault() {
		if (!creativeService.existsByUsername("sara.cb")) {
			Creative admin = new Creative();

			Set<Profession> professions = new HashSet<Profession>();
			professions.add(Profession.WEB_DEVELOPER);
			professions.add(Profession.WEB_DESIGNER);

			admin.setUsername("sara.cb");
			admin.setEmail("sara.cb@maze.com");
			admin.setPassword(passwordEncoder.encode("amazing"));
			admin.setRoles(adminRole);
			admin.setRegistrationDate(LocalDate.now());
			admin.setStageName("Sara.cb");
			admin.setFirstname("Sara");
			admin.setLastname("Campobasso");
			admin.setBio("Web Developer, creator of Maze");
			admin.setCity("Modena");
			admin.setState("Italy");
			admin.setProfessions(professions);
			admin.setPortfolio(new Portfolio());
			creativeService.saveCreative(admin);

		}
	}

	public void saveModeratorDefault() {
		if (!creativeService.existsByUsername("vale.pg")) {

			Creative moderator = new Creative();

			Set<Profession> professions = new HashSet<Profession>();
			professions.add(Profession.ILLUSTRATOR);
			professions.add(Profession.GRAPHIC_DESIGNER);

			moderator.setUsername("vale.pg");
			moderator.setEmail("vale.pg@maze.com");
			moderator.setPassword(passwordEncoder.encode("amazing"));
			moderator.setRoles(moderatorRole);
			moderator.setRegistrationDate(LocalDate.now());
			moderator.setStageName("Vale.pg");
			moderator.setFirstname("Valentina");
			moderator.setLastname("Poggi");
			moderator.setBio("Illustrator, Graphic designer, Co-founder of [A]maze");
			moderator.setCity("Modena");
			moderator.setState("Italy");
			moderator.setProfessions(professions);
			moderator.setPortfolio(new Portfolio());
			creativeService.saveCreative(moderator);
		}
	}

	public void saveUserDefault() {
		if (!creativeService.existsByUsername("mario.rossi")) {

			Creative user = new Creative();

			Set<Profession> professions = new HashSet<Profession>();
			professions.add(Profession.INFLUENCER);

			user.setUsername("mario.rossi");
			user.setEmail("mario.rossi@example.com");
			user.setPassword(passwordEncoder.encode("user"));
			user.setRoles(userRole);
			user.setRegistrationDate(LocalDate.now());
			user.setStageName("MarioReds");
			user.setFirstname("Mario");
			user.setLastname("Rossi");
			user.setBio("Everybody knows my name!");
			user.setCity("Roma");
			user.setState("Italy");
			user.setProfessions(professions);
			user.setPortfolio(new Portfolio());
			creativeService.saveCreative(user);
		}
	}
}
