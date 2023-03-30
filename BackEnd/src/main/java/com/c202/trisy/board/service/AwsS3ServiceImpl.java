package com.c202.trisy.board.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.NoSuchFileException;

@Slf4j
@RequiredArgsConstructor
@Service
public class AwsS3ServiceImpl implements AwsS3Service{

    private final AmazonS3Client amazonS3Client;


    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;

    @Override
    public String uploadFile(MultipartFile multipartFile) throws IllegalAccessException, NoSuchFileException {

        validateFileExists(multipartFile);

        String fileName = CommonUtils.buildFileName(multipartFile.getOriginalFilename());

        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentType(multipartFile.getContentType());

        try (InputStream inputStream = multipartFile.getInputStream()) {
            amazonS3Client.putObject(new PutObjectRequest(bucketName, fileName, inputStream, objectMetadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead));
        } catch (IOException e) {
            throw new IllegalAccessException("server error has occurred");
        }

        return amazonS3Client.getUrl(bucketName, fileName).toString();
    }

    @Override
    public void validateFileExists(MultipartFile multipartFile) throws NoSuchFileException {
        if (multipartFile.isEmpty()) {
            throw new NoSuchFileException("File does not exist");
        }
    }
}
