package com.example.MemberArticle.controller;

import com.example.MemberArticle.dto.ArticleRequest;
import com.example.MemberArticle.dto.ArticleResponse;
import com.example.MemberArticle.service.ArticleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/articles")
@RequiredArgsConstructor
public class ArticleController {

    private final ArticleService articleService;

    // 게시글 등록
    // POST /api/articles?memberId=1
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ArticleResponse post(
            @RequestParam Long memberId,
            @RequestBody ArticleRequest articleRequest) {

        return articleService.create(memberId, articleRequest);
    }

    // 게시글 전체 조회
    // GET /api/articles
    @GetMapping
    public List<ArticleResponse> getByMember(
            @RequestParam(name = "memberId", required = false) Long memberId) {

        if (memberId == null) {
            return articleService.findAll();
        } else {
            return articleService.findByMemberId(memberId);
        }
    }

    // 게시글 상세 조회
    // GET /api/articles/1
    @GetMapping("/{id}")
    public ArticleResponse get(@PathVariable("id") Long id) {
        return articleService.findById(id);
    }

    // 게시글 수정
    // PUT /api/articles/1
    @PutMapping("/{id}")
    public ArticleResponse put(
            @PathVariable("id") Long id,
            @RequestBody ArticleRequest articleRequest) {

        return articleService.update(id, articleRequest);
    }

    // 게시글 삭제
    // DELETE /api/articles/1
    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Long id) {
        articleService.delete(id);
    }
}