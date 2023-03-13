package com.c202.trisy.user.config;

import com.c202.trisy.Repository.MemberRepository;
import com.c202.trisy.user.filter.JwtAuthenticationFilter;
import com.c202.trisy.user.filter.JwtAuthorizationFilter;
import com.c202.trisy.user.repository.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableGlobalMethodSecurity(securedEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final MemberRepository memberRepository;
    private final RefreshTokenRepository refreshTokenRepository;

    private final CorsConfig corsConfig;
    @Override
    protected void configure(HttpSecurity http) throws Exception {

        JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager(), refreshTokenRepository);
        jwtAuthenticationFilter.setFilterProcessesUrl("/api/users/login");

        http
                .addFilter(corsConfig.corsFilter()) // cors 처리
                .csrf().disable() // csrf 처리
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // session 사용 x
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .addFilter(jwtAuthenticationFilter)
                .addFilter(new JwtAuthorizationFilter(authenticationManager(), memberRepository, refreshTokenRepository))
                .authorizeRequests()
                .antMatchers("/")
                .authenticated()
                .antMatchers("/api/v1/user/**")
                .hasAnyAuthority("admin","user")
                .antMatchers("/api/v1/admin/**")
                .hasAuthority("admin")
                .anyRequest().permitAll();

    }


}

