package com.example.MemberArticle.repository;

import com.example.MemberArticle.model.Article;
import com.example.MemberArticle.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
    List<Article> findByMember(Member member);
}
