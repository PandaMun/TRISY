package com.c202.trisy.board.service;

import org.springframework.web.multipart.MultipartFile;

import java.nio.file.NoSuchFileException;

public interface AwsS3Service {
    String uploadFile(MultipartFile multipartFile) throws IllegalAccessException, NoSuchFileException;

    void validateFileExists(MultipartFile multipartFile) throws NoSuchFileException;
}
