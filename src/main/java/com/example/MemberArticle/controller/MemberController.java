package com.example.MemberArticle.controller;

import com.example.MemberArticle.dto.ArticleRequest;
import com.example.MemberArticle.dto.ArticleResponse;
import com.example.MemberArticle.dto.MemberRequest;
import com.example.MemberArticle.dto.MemberResponse;
import com.example.MemberArticle.repository.MemberRepository;
import com.example.MemberArticle.service.ArticleService;
import com.example.MemberArticle.service.MemberService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.rmi.ServerException;
import java.util.List;

@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
public class MemberController {
    private final MemberRepository memberRepository;
    private final MemberService memberService;
    private final ArticleService articleService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public MemberResponse post(@RequestBody MemberRequest memberRequest){
        return memberService.create(memberRequest);
    }
    @PostMapping("/batch")
    @ResponseStatus(HttpStatus.CREATED)
    public List<MemberResponse> postBatch(@RequestBody List<MemberRequest> memberRequests){
        return memberService.createBatch(memberRequests);
    }

    @GetMapping
    public List<MemberResponse> getAll(){
        return memberService.findAll();
    }

    @GetMapping("/{id}")
    private MemberResponse get(@PathVariable("id") Long id) throws ChangeSetPersister.NotFoundException {
        return memberService.findById(id);
    }

    @GetMapping("/{id}/articles")
    public void getArticle(@PathVariable("id") Long id, HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException{
        request.getSession()
                .getServletContext()
                .getRequestDispatcher("/api/articles?memberId="+id)
                .forward(request,response);
    }

    @PutMapping("/{id}")
    private MemberResponse put(@PathVariable("id") Long id, @RequestBody MemberRequest memberRequest){
        return memberService.update(id, memberRequest);
    }

    @PatchMapping("/{id}")
    public MemberResponse patch(@PathVariable("id") Long id, @RequestBody MemberRequest memberRequest){
        return memberService.patch(id, memberRequest);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Long id){
        memberService.deleteById(id);
    }
}
