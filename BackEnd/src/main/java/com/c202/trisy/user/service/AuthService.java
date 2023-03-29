package com.c202.trisy.user.service;

import com.auth0.jwt.exceptions.TokenExpiredException;
import com.c202.trisy.entity.Member;
import com.c202.trisy.entity.Role;
import com.c202.trisy.repository.MemberRepository;
import com.c202.trisy.user.common.JwtProperties;
import com.c202.trisy.user.common.JwtUtil;
import com.c202.trisy.user.dto.OAuthToken;
import com.c202.trisy.user.dto.RefreshToken;
import com.c202.trisy.user.model.oauth.KakaoProfile;
import com.c202.trisy.user.repository.RefreshTokenRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import java.sql.Ref;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@Slf4j
public class AuthService {

    @Value("${kakao.service.key}")
    private String appKey;

    @Value("${kakao.redirect.url}")
    private String redirectUrl;

    @Autowired
    private BCryptPasswordEncoder bcryptPasswordEncoder;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    JwtUtil jwtUtil;

    @Autowired
    RefreshTokenRepository refreshTokenRepository;

    public OAuthToken getAccessToken(String code) {

        //(2)
        RestTemplate rt = new RestTemplate();

        //(3)
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        //(4)
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", appKey);
        params.add("redirect_uri", redirectUrl);
        params.add("code", code);
//        params.add("client_secret", "{시크릿 키}"); // 생략 가능!

        //(5)
        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest =
                new HttpEntity<>(params, headers);

        //(6)
        ResponseEntity<String> accessTokenResponse = rt.exchange(
                "https://kauth.kakao.com/oauth/token",
                HttpMethod.POST,
                kakaoTokenRequest,
                String.class
        );

        //(7)
        ObjectMapper objectMapper = new ObjectMapper();
        OAuthToken oAuthToken = null;
        try {
            oAuthToken = objectMapper.readValue(accessTokenResponse.getBody(), OAuthToken.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return oAuthToken; //(8)
    }

    public Map<String,String> saveUserAndGetToken(String token) { //(1)
        KakaoProfile profile = findProfile(token);
        String isNew = "false";
        Optional<Member> optionalMember = memberRepository.findByEmail(profile.getKakao_account().getEmail());
        Member member = null;
        if(!optionalMember.isPresent()) { //회원가입한 적이 없다면
            member = Member.builder()
                    .name(profile.getKakao_account().getProfile().getNickname())
                    .email(profile.getKakao_account().getEmail())
                    .password(bcryptPasswordEncoder.encode("trisy"))
                    .phone("01012345678")
                    .provider("kakao")
                    .providerId(profile.getId().toString())
                    .role(Role.USER).build();

            memberRepository.save(member);
        } else {
            member = optionalMember.get();
            isNew = "true";
        }
        Map<String,String> jwtToken = new HashMap<>();
        jwtToken.put("accessToken",jwtUtil.createAccessToken(member));
        String refreshToken = jwtUtil.createRefreshToken(member);
        RefreshToken redisToken = new RefreshToken(member.getEmail(), refreshToken);
        refreshTokenRepository.save(redisToken);
        jwtToken.put("refreshToken",refreshToken);
        jwtToken.put("isNew",isNew);
        return jwtToken;
    }


    //(1-1)
    public KakaoProfile findProfile(String token) {

        //(1-2)
        RestTemplate rt = new RestTemplate();

        //(1-3)
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + token); //(1-4)
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        //(1-5)
        HttpEntity<MultiValueMap<String, String>> kakaoProfileRequest =
                new HttpEntity<>(headers);

        //(1-6)
        // Http 요청 (POST 방식) 후, response 변수에 응답을 받음
        ResponseEntity<String> kakaoProfileResponse = rt.exchange(
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.POST,
                kakaoProfileRequest,
                String.class
        );

        //(1-7)
        ObjectMapper objectMapper = new ObjectMapper();
        KakaoProfile kakaoProfile = null;
        try {
            kakaoProfile = objectMapper.readValue(kakaoProfileResponse.getBody(), KakaoProfile.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return kakaoProfile;
    }

    public String validRefreshToken(HttpServletRequest request) {
        log.info("refresh 요청 시작");
        String header = request.getHeader(JwtProperties.REFRESH_HEADER_STRING);
        String email = "";
        if(header == null || !header.startsWith(JwtProperties.TOKEN_HEADER_PREFIX)) {
            log.info("이상한 refreshToken");
        } else {
            String token = request.getHeader(JwtProperties.REFRESH_HEADER_STRING)
                    .replace("Bearer ", "");
            log.info("token: {}",token);
            try {
                email = jwtUtil.getUserEmail(token);
                log.info("email: {}",email);
                Optional<RefreshToken> optMember = refreshTokenRepository.findById(email);
                if(!token.equals(optMember.get().getRefreshToken())) {
                    log.info("Token이 이상합니다.");
                } else {
                    Member member = memberRepository.findByEmail(email).get();
                    String accessToken = jwtUtil.createAccessToken(member);
                    return accessToken;
                }
            } catch(TokenExpiredException e) {
                log.info("RefreshToken이 만료되었습니다.");
            }

        }
        return "invalid refreshToken";
    }


}
