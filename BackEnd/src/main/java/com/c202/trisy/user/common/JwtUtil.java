package com.c202.trisy.user.common;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.c202.trisy.entity.Member;
import com.c202.trisy.user.auth.PrincipalDetailsService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtUtil {

    @Autowired
    private PrincipalDetailsService principalDetailsService;

    private String secretKey;
    public static long ACCESS_EXP_TIME;// 1분

    public static long REFRESH_EXP_TIME;// 30시간

    String ACCESS_HEADER_STRING = "accessToken";
    String REFRESH_HEADER_STRING = "refreshToken";
    String TOKEN_HEADER_PREFIX = "Bearer ";

    @Autowired
    public JwtUtil(@Value("${jwt.secret}") String secretKey) {
        this.secretKey = secretKey;
        this.ACCESS_EXP_TIME = 1000 * 30;
        this.REFRESH_EXP_TIME = 1000 * 60 * 60 * 3;
    }

    //토큰 생성
//    public TokenInfo generateToken(String userId, String accessToken, String refreshToken){
//
//        return TokenInfo.builder()
//                .userId(userId)
//                .grantType(TOKEN_PREFIX)
//                .authorization(accessToken)
//                .refreshToken(refreshToken)
//                .accessTokenExpirationTime(ACCESS_TOKEN_EXPIRE_TIME)
//                .refreshTokenExpirationTime(REFRESH_TOKEN_EXPIRE_TIME)
//                .build();
//    }

    //accessToken 생성
    public  String createAccessToken(Member member) {
        return JWT.create()
                .withSubject(member.getEmail())
                .withExpiresAt(new Date(System.currentTimeMillis() + this.ACCESS_EXP_TIME))
                .withClaim("email", member.getEmail())
                .withClaim("name", member.getName())
                .sign(Algorithm.HMAC512(secretKey.getBytes()));
    }

    //refreshToken 생성
    public  String createRefreshToken(Member member) {
        return JWT.create()
                .withSubject(member.getEmail())
                .withExpiresAt(new Date(System.currentTimeMillis() + this.REFRESH_EXP_TIME))
                .withClaim("email", member.getEmail())
                .sign(Algorithm.HMAC512(secretKey.getBytes()));
    }

    // 토큰에서 회원 정보(아이디) 추출
    public String getUserEmail(String token) {
        return JWT.require(Algorithm.HMAC512(secretKey)).build().verify(token)
                .getClaim("email").asString();
    }

    //토큰 유효시간 체크
    public boolean validateToken(String jwtToken) {
        Date expiration = new Date();
        expiration = Jwts.parserBuilder().setSigningKey(Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8)))
                .build().parseClaimsJws(jwtToken)
                .getBody().getExpiration();

        return expiration.after(new Date());
    }

    // accessToken HEADER 체크
    public String resolveAccessToken(HttpServletRequest request) {
        if(request.getHeader("accessToken") != null )
            return request.getHeader("accessToken");
        return null;
    }

}
