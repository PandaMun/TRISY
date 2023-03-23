package com.c202.trisy.user.controller;

import com.c202.trisy.entity.Member;
import com.c202.trisy.user.dto.OAuthToken;
import com.c202.trisy.user.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    // 프론트에서 인가코드 받아오는 url
    @GetMapping("/oauth/token")
    public Member getLogin(@RequestParam("code") String code) {

        // 넘어온 인가 코드를 통해 access_token 발급
        OAuthToken oAuthToken = authService.getAccessToken(code);

        // 발급 받은 accessToken으로 카카오 회원 정보 DB 저장
        Member member = authService.saveUser(oAuthToken.getAccess_token());

        return member;
    }

}
