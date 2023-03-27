package com.c202.trisy.user.controller;

import com.c202.trisy.entity.Member;
import com.c202.trisy.user.dto.OAuthToken;
import com.c202.trisy.user.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    // 프론트에서 인가코드 받아오는 url
    @GetMapping("/oauth/token")
    public ResponseEntity<String> getLogin(@RequestParam("code") String code) {

        // 넘어온 인가 코드를 통해 access_token 발급
        OAuthToken oAuthToken = authService.getAccessToken(code);

        Map<String, String> jwtTokens = authService.saveUserAndGetToken(oAuthToken.getAccess_token());

        //(3)
        HttpHeaders headers = new HttpHeaders();
        headers.add("accessToken", "Bearer " + jwtTokens.get("accessToken"));
        headers.add("refreshToken", "Bearer " + jwtTokens.get("refreshToken"));

        //(4)
        return ResponseEntity.ok().headers(headers).body("success");
    }

}
