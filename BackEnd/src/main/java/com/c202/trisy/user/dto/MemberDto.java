package com.c202.trisy.user.dto;


import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

public class MemberDto {

    @Getter
    @AllArgsConstructor
    public static class Id {
        private Long memberId;
    }

    @Getter
    @Builder
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @AllArgsConstructor
    public static class Basic {
        Long id;

        String email;

        String password;

        String name;

        String role;

        String birth;

        String phone;
    }
}
