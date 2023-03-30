package com.c202.trisy.user.controller;

import com.c202.trisy.entity.Member;
import com.c202.trisy.user.dto.OAuthToken;
import com.c202.trisy.user.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
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
        headers.add("isNew",jwtTokens.get("isNew"));

        //(4)
        return ResponseEntity.ok().headers(headers).body("success");
    }

    @GetMapping("/token/refresh")
    public ResponseEntity<String> validRefresh(HttpServletRequest request) {
        String accessToken = authService.validRefreshToken(request);
        if(accessToken.equals("invalid refreshToken")) {
            return ResponseEntity.ok().body("invalid");
        }
        HttpHeaders headers = new HttpHeaders();
        headers.add("accessToken", "Bearer " + accessToken);
        return ResponseEntity.ok().headers(headers).body("issue new accessToken");
    }

}
