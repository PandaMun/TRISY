package com.c202.trisy.controller;

import com.c202.trisy.dto.Area;
import com.c202.trisy.service.ApiService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;


//@CrossOrigin("*")
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ApiController {


    private final ApiService apiService;

    @GetMapping("/region")
    public ResponseEntity<?> saveRegion(){
        List<Area> areaList;
        try {
           areaList  = apiService.getSi();
        } catch (IOException e) {
            return new ResponseEntity<>("get Area "+e.getMessage(), HttpStatus.BAD_REQUEST);
        }

        try {
            apiService.saveRegion(areaList);
        } catch (IOException e) {
            return new ResponseEntity<>("save region " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>("save region success" , HttpStatus.OK);
    }

    @GetMapping("/theme")
    public ResponseEntity<?> saveTheme(){
        try {
            apiService.saveTheme();
        } catch (IOException e) {
            return new ResponseEntity<>("save theme " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>("save theme success" , HttpStatus.OK);
    }


    @GetMapping("/spot")
    public ResponseEntity<?> saveSpot(){
        try {
            apiService.saveSpot();
        } catch (IOException e) {
            return new ResponseEntity<>("save spot " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>("save spot success" , HttpStatus.OK);
    }

}
