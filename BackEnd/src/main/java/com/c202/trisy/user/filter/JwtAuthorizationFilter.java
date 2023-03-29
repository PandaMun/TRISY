package com.c202.trisy.user.filter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.c202.trisy.entity.Member;
import com.c202.trisy.repository.MemberRepository;
import com.c202.trisy.user.auth.PrincipalDetails;
import com.c202.trisy.user.common.JwtProperties;
import com.c202.trisy.user.common.JwtUtil;
import com.c202.trisy.user.dto.RefreshToken;
import com.c202.trisy.user.repository.RefreshTokenRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.stereotype.Component;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;


@Slf4j
public class JwtAuthorizationFilter extends BasicAuthenticationFilter {

    private final JwtUtil jwtUtil;

    private final MemberRepository memberRepository;

    private final RefreshTokenRepository refreshTokenRepository;

    private ObjectMapper objectMapper = new ObjectMapper();

    public JwtAuthorizationFilter(AuthenticationManager authenticationManager, MemberRepository memberRepository, RefreshTokenRepository refreshTokenRepository
    ,JwtUtil jwtUtil) {
        super(authenticationManager);
        this.memberRepository = memberRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        log.info("JwtAuthorization 시작");
        String header = request.getHeader(JwtProperties.ACCESS_HEADER_STRING);
        String email = " ";
        if(header == null || !header.startsWith(JwtProperties.TOKEN_HEADER_PREFIX)) {
            // 토큰값이 없거나 정상적이지 않다면 400 오류
            chain.doFilter(request, response);
        } else {
            try {
                log.debug("header : {}", header);
                //JWT 토큰을 검증을 해서 정상적인 사용자인지 확인
                String token = request.getHeader(JwtProperties.ACCESS_HEADER_STRING)
                        .replace("Bearer ", "");
                // 토큰 검증 (이게 인증이기 때문에 AuthenticationManager도 필요 없음)
                // 내가 SecurityContext에 직접접근해서 세션을 만들때 자동으로 UserDetailsService에 있는 loadByUsername이 호출됨.
                email = jwtUtil.getUserEmail(token);
//                System.out.println("이메일: "+email);

                // 정상적으로 서명이 됨
                if (email != null) {
                    Member member = memberRepository.findByEmail(email)
                            .orElseThrow(() -> new UsernameNotFoundException("사용자를 찾을 수 없습니다."));
                    log.debug(member.toString());

                    // 인증은 토큰 검증시 끝. 인증을 하기 위해서가 아닌 스프링 시큐리티가 수행해주는 권한 처리를 위해
                    // 아래와 같이 토큰을 만들어서 Authentication 객체를 강제로 만들고 그걸 세션에 저장!
                    // Jwt토큰 서명을 통해서 서명이 정상이면 Authentication 객체를 만들어 준다.
                    PrincipalDetails principalDetails = new PrincipalDetails(member);
                    Authentication authentication =
                            new UsernamePasswordAuthenticationToken(
                                    principalDetails, //나중에 컨트롤러에서 DI해서 쓸 때 사용하기 편함.
                                    null, // 패스워드는 모르니까 null 처리
                                    principalDetails.getAuthorities());
                    for (GrantedAuthority ga : principalDetails.getAuthorities()) {
                        log.info("role : {}", ga.toString());
                    }

                    // 강제로 시큐리티의 세션에 접근하여 Authentication 객체를 저장
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                    log.info("테스트: {}",SecurityContextHolder.getContext().toString());
                    chain.doFilter(request, response);
                }

            } catch(TokenExpiredException e) {
                log.info("CustomAuthorizationFilter : Access Token이 만료되었습니다.");

                try {
                    chain.doFilter(request, response);
                } catch (Exception ex) {
                    log.info(ex.getMessage());
                    setErrorResponse(HttpStatus.UNAUTHORIZED,response, ex);
                }

            } catch(Exception e) {
                logger.info("CustomAuthorizationFilter : JWT 토큰이 잘못되었습니다. message : " + e.getMessage());
                response.setContentType(APPLICATION_JSON_VALUE);
                response.setCharacterEncoding("utf-8");
                new ObjectMapper().writeValue(response.getWriter(), new ResponseEntity<String>("인가필터 : " + e.getMessage(), HttpStatus.BAD_REQUEST));
            }
        }

    }

    public void setErrorResponse(HttpStatus status, HttpServletResponse res, Throwable ex) throws IOException {
        res.setStatus(status.value());
        res.setContentType("application/json; charset=UTF-8");
        HttpStatus.UNAUTHORIZED.value();
        res.getWriter().write(objectMapper.writeValueAsString("accessToken expired"));
    }

}
