package com.c202.trisy.user.dto;

import javax.persistence.Id;

public class RefreshToken {

    @Id
    private String email;

    private String refreshToken;

    public RefreshToken(String email, String refreshToken) {
        this.email = email;
        this.refreshToken = refreshToken;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public String getEmail() {
        return email;
    }
}
