package com.c202.trisy.user.config;

import com.c202.trisy.repository.MemberRepository;
import com.c202.trisy.user.filter.JwtAuthenticationFilter;
import com.c202.trisy.user.filter.JwtAuthorizationFilter;
import com.c202.trisy.user.repository.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableGlobalMethodSecurity(securedEnabled = true)
public class SecurityConfig {

    @Autowired
    private final MemberRepository memberRepository;

    @Autowired
    private final RefreshTokenRepository refreshTokenRepository;

    @Autowired
    private final CorsConfig corsConfig;

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .apply(new MyCustomDsl())
                .and()
                .authorizeRequests()
                .antMatchers("/")
                .authenticated()
                .antMatchers(HttpMethod.POST,"/api/user")
                .permitAll()
                .antMatchers(HttpMethod.GET,"/api/user/email/**")
                .permitAll()
                .antMatchers("/api/user/**")
                .hasAnyAuthority("ADMIN","USER")
                .antMatchers("/api/admin/**")
                .hasAnyAuthority("ADMIN")
                .anyRequest().permitAll();

        return http.build();

    }

    public class MyCustomDsl extends AbstractHttpConfigurer<MyCustomDsl, HttpSecurity> {
        @Override
        public void configure(HttpSecurity http) throws Exception {

            AuthenticationManager authenticationManager = http.getSharedObject(AuthenticationManager.class);
            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, refreshTokenRepository);
            jwtAuthenticationFilter.setFilterProcessesUrl("/api/users/login");


            http
                    .addFilter(corsConfig.corsFilter())
                    .addFilter(jwtAuthenticationFilter)
                    .addFilter(new JwtAuthorizationFilter(authenticationManager, memberRepository, refreshTokenRepository));
        }
    }

//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//
//        JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager(), refreshTokenRepository);
//        jwtAuthenticationFilter.setFilterProcessesUrl("/api/users/login");
//
//        http
//                .addFilter(corsConfig.corsFilter()) // cors 처리
//                .csrf().disable() // csrf 처리
//                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // session 사용 x
//                .and()
//                .formLogin().disable()
//                .httpBasic().disable()
//                .addFilter(jwtAuthenticationFilter)
//                .addFilter(new JwtAuthorizationFilter(authenticationManager(), memberRepository, refreshTokenRepository))
//                .authorizeRequests()
//                .antMatchers("/")
//                .authenticated()
//                .antMatchers("/api/v1/user/**")
//                .hasAnyAuthority("admin","user")
//                .antMatchers("/api/v1/admin/**")
//                .hasAuthority("admin")
//                .anyRequest().permitAll();
//
//    }


}

