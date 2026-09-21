package com.example.MemberArticle;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class MemberArticleApplication {

	public static void main(String[] args) {
		SpringApplication.run(MemberArticleApplication.class, args);
	}

}
