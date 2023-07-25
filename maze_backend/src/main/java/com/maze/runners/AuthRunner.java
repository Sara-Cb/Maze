package com.maze.runners;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.maze.enumerations.Profession;
import com.maze.enumerations.RoleType;
import com.maze.enumerations.Skill;
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
	AuthService authService;

	@Autowired
	private PasswordEncoder passwordEncoder;

	Timestamp now = new Timestamp(System.currentTimeMillis());

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
			Set<Skill> skills = new HashSet<Skill>();
			skills.add(Skill.JAVA_PROGRAMMING);
			skills.add(Skill.JAVASCRIPT_PROGRAMMING);
			skills.add(Skill.GRAPHIC_DESIGN);
			skills.add(Skill.BRANDING);

			admin.setUsername("sara.cb");
			admin.setEmail("sara.cb@maze.com");
			admin.setPassword(passwordEncoder.encode("#Amazing1"));
			admin.setRoles(adminRole);
			admin.setRegistrationDate(now);
			admin.setStageName("Sara.cb");
			admin.setFirstname("Sara");
			admin.setLastname("Campobasso");
			admin.setImage("https://res.cloudinary.com/dupn6xl7q/image/upload/v1690242573/myk3gfpzf0yt0qfo48vh.jpg");
			admin.setBio("Creator of Maze, Co-founder of [A]maze studio, Web Developer");
			admin.setCity("Modena");
			admin.setState("Italy");
			admin.setSkills(skills);
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
			Set<Skill> skills = new HashSet<Skill>();
			skills.add(Skill.ILLUSTRATION);
			skills.add(Skill.ANIMATION);
			skills.add(Skill.GRAPHIC_DESIGN);
			skills.add(Skill.BRANDING);

			moderator.setUsername("vale.pg");
			moderator.setEmail("vale.pg@maze.com");
			moderator.setPassword(passwordEncoder.encode("Amazing2!"));
			moderator.setRoles(moderatorRole);
			moderator.setRegistrationDate(now);
			moderator.setStageName("Vale.pg");
			moderator.setFirstname("Valentina");
			moderator.setLastname("Poggi");
			moderator.setBio("Illustrator, Graphic designer, Co-founder of [A]maze");
			moderator.setImage(
					"https://cdn.dribbble.com/users/6789253/avatars/normal/8ef616f481f3a054dd9cda023198bb74.jfif?1638800009");
			moderator.setCity("Modena");
			moderator.setState("Italy");
			moderator.setProfessions(professions);
			moderator.setSkills(skills);
			moderator.setPortfolio(new Portfolio());
			creativeService.saveCreative(moderator);
		}
	}

	public void saveUserDefault() {
		if (!creativeService.existsByUsername("mario.rossi")) {

			Creative user = new Creative();

			Set<Profession> professions = new HashSet<Profession>();
			professions.add(Profession.INFLUENCER);
			Set<Skill> skills = new HashSet<Skill>();
			skills.add(Skill.IMPROVISATION);
			skills.add(Skill.BLOGGING);
			skills.add(Skill.COPYWRITING);
			user.setSkills(skills);

			user.setUsername("mario.rossi");
			user.setEmail("mario.rossi@example.com");
			user.setPassword(passwordEncoder.encode("Amazing3?"));
			user.setRoles(userRole);
			user.setRegistrationDate(now);
			user.setStageName("MarioReds");
			user.setFirstname("Mario");
			user.setLastname("Rossi");
			user.setBio("Everybody knows my name!");
			user.setImage(
					"https://www.socialmedianotes.com/wp-content/uploads/2022/12/man-with-sunglasses-wearing-white-t-shirt-posing.webp");
			user.setCity("Roma");
			user.setState("Italy");
			user.setProfessions(professions);
			user.setPortfolio(new Portfolio());
			creativeService.saveCreative(user);
		}
		if (!creativeService.existsByUsername("janedoe")) {

			Creative user = new Creative();

			Set<Profession> professions = new HashSet<Profession>();
			professions.add(Profession.FASHION_DESIGNER);
			Set<Skill> skills = new HashSet<Skill>();
			skills.add(Skill.FASHION_DESIGN);
			skills.add(Skill.COSTUME_DESIGN);
			skills.add(Skill.PRODUCT_DESIGN);
			user.setSkills(skills);

			user.setUsername("janedoe");
			user.setEmail("janedoe@example.com");
			user.setPassword(passwordEncoder.encode("Amazing4"));
			user.setRoles(userRole);
			user.setRegistrationDate(now);
			user.setStageName("JDane");
			user.setFirstname("Jane");
			user.setLastname("Doe");
			user.setBio("Designing fashion accessories with a vintage style");
			user.setImage(
					"https://cosmeticsbusiness.com/article-image-alias/vanilla-girl-beauty-is-already-the.jpeg");
			user.setCity("Milano");
			user.setState("Italy");
			user.setProfessions(professions);
			user.setPortfolio(new Portfolio());
			creativeService.saveCreative(user);
		}
		if (!creativeService.existsByUsername("laura.bianchi")) {

			Creative user = new Creative();

			Set<Profession> professions = new HashSet<Profession>();
			professions.add(Profession.PHOTOGRAPHER);
			Set<Skill> skills = new HashSet<Skill>();
			skills.add(Skill.PHOTOGRAPHY);
			skills.add(Skill.PHOTO_EDITING);
			skills.add(Skill.PHOTOSHOP);
			user.setSkills(skills);

			user.setUsername("laura.bianchi");
			user.setEmail("laura.bianchi@example.com");
			user.setPassword(passwordEncoder.encode("Lovely4!"));
			user.setRoles(userRole);
			user.setRegistrationDate(now);
			user.setStageName("LauraBee");
			user.setFirstname("Laura");
			user.setLastname("Bianchi");
			user.setBio("I capture the beauty of the world with my camera.");
			user.setImage(
					"https://th.bing.com/th/id/OIP.l_g_IgHucR47frh6TcI5OAHaE8?pid=ImgDet&w=211&h=140.66666666666669&c=7&dpr=1,2");
			user.setCity("Milano");
			user.setState("Italy");
			user.setProfessions(professions);
			user.setPortfolio(new Portfolio());
			creativeService.saveCreative(user);
		}

		if (!creativeService.existsByUsername("marco.verdi")) {

			Creative user = new Creative();

			Set<Profession> professions = new HashSet<Profession>();
			professions.add(Profession.MUSICIAN);
			Set<Skill> skills = new HashSet<Skill>();
			skills.add(Skill.GUITAR_PLAYING);
			skills.add(Skill.PIANO_PLAYING);
			skills.add(Skill.KEYBOARD_PLAYING);
			user.setSkills(skills);

			user.setUsername("marco.verdi");
			user.setEmail("marco.verdi@example.com");
			user.setPassword(passwordEncoder.encode("Rocky5*"));
			user.setRoles(userRole);
			user.setRegistrationDate(now);
			user.setStageName("MarcoVee");
			user.setFirstname("Marco");
			user.setLastname("Verdi");
			user.setBio("I make music that moves your soul.");
			user.setImage("https://i.pinimg.com/originals/45/26/d0/4526d0c5bd182a05c12f240a3c700d1d.jpg");
			user.setCity("Napoli");
			user.setState("Italy");
			user.setProfessions(professions);
			user.setPortfolio(new Portfolio());
			creativeService.saveCreative(user);

		}
		if (!creativeService.existsByUsername("anna.rossi")) {

			Creative user = new Creative();

			Set<Profession> professions = new HashSet<Profession>();
			professions.add(Profession.COPYWRITER);
			Set<Skill> skills = new HashSet<Skill>();
			skills.add(Skill.COPYWRITING);
			skills.add(Skill.BOOK_WRITING);
			skills.add(Skill.CREATIVE_WRITING);
			user.setSkills(skills);

			user.setUsername("anna.rossi");
			user.setEmail("anna.rossi@example.com");
			user.setPassword(passwordEncoder.encode("Writer6^"));
			user.setRoles(userRole);
			user.setRegistrationDate(now);
			user.setStageName("AnnaRose");
			user.setFirstname("Anna");
			user.setLastname("Rossi");
			user.setBio("I write stories that touch your heart.");
			user.setImage(
					"https://jeenacho.com/wp-content/uploads/2020/01/hannah-olinger-NXiIVnzBwZ8-unsplash-scaled.jpg");
			user.setCity("Torino");
			user.setState("Italy");
			user.setProfessions(professions);
			user.setPortfolio(new Portfolio());
			creativeService.saveCreative(user);
		}

		if (!creativeService.existsByUsername("luca.neri")) {

			Creative user = new Creative();

			Set<Profession> professions = new HashSet<Profession>();
			professions.add(Profession.ACTOR);
			Set<Skill> skills = new HashSet<Skill>();
			skills.add(Skill.ACTING);
			skills.add(Skill.PUBLIC_SPEAKING);
			skills.add(Skill.DANCING);
			user.setSkills(skills);

			user.setUsername("luca.neri");
			user.setEmail("luca.neri@example.com");
			user.setPassword(passwordEncoder.encode("Actor7&"));
			user.setRoles(userRole);
			user.setRegistrationDate(now);
			user.setStageName("LucaNero");
			user.setFirstname("Luca");
			user.setLastname("Neri");
			user.setBio("I act with passion and charisma.");
			user.setImage("https://th.bing.com/th/id/OIP.Rd9rVZZlN6rrMrMT8x6nTgHaHa?pid=ImgDet&rs=1");
			user.setCity("Firenze");
			user.setState("Italy");
			user.setProfessions(professions);
			user.setPortfolio(new Portfolio());
			creativeService.saveCreative(user);

		}
		if (!creativeService.existsByUsername("sara.gialli")) {

			Creative user = new Creative();

			Set<Profession> professions = new HashSet<Profession>();
			professions.add(Profession.DANCER);
			Set<Skill> skills = new HashSet<Skill>();
			skills.add(Skill.DANCING);
			skills.add(Skill.CHOREOGRAPHY);
			user.setSkills(skills);

			user.setUsername("sara.gialli");
			user.setEmail("sara.gialli@example.com");
			user.setPassword(passwordEncoder.encode("Dance8@"));
			user.setRoles(userRole);
			user.setRegistrationDate(now);
			user.setStageName("SaraGee");
			user.setFirstname("Sara");
			user.setLastname("Gialli");
			user.setBio("I dance with grace and elegance.");
			user.setImage("https://th.bing.com/th/id/OIP.dpuGM94MXcHY1wrbDEEr8gHaJQ?pid=ImgDet&rs=1");
			user.setCity("Bologna");
			user.setState("Italy");
			user.setProfessions(professions);
			user.setPortfolio(new Portfolio());
			creativeService.saveCreative(user);
		}
		if (!creativeService.existsByUsername("davide.bruni")) {

			Creative user = new Creative();

			Set<Profession> professions = new HashSet<Profession>();
			professions.add(Profession.PAINTER);
			Set<Skill> skills = new HashSet<Skill>();
			skills.add(Skill.OIL_PAINTING);
			skills.add(Skill.ACRYLIC_PAINTING);
			skills.add(Skill.WATERCOLOR_PAINTING);
			user.setSkills(skills);
			user.setUsername("davide.bruni");
			user.setEmail("davide.bruni@example.com");
			user.setPassword(passwordEncoder.encode("Paint9#"));
			user.setRoles(userRole);
			user.setRegistrationDate(now);
			user.setStageName("DavidArt");
			user.setFirstname("Davide");
			user.setLastname("Bruni");
			user.setBio("I paint with colors and emotions.");
			user.setImage("https://fp-wordpress-assets.s3.amazonaws.com/2019/06/FP005115PF.jpg");
			user.setCity("Verona");
			user.setState("Italy");
			user.setProfessions(professions);
			user.setPortfolio(new Portfolio());
			creativeService.saveCreative(user);
		}
	}
}
