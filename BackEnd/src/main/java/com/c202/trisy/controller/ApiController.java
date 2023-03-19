package com.c202.trisy.controller;

import com.c202.trisy.entity.Area;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
//@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class ApiController {

//    @Value("${trisy.serviceKey}")
//    private final String serviceKey = "90QVMyD6DDbxum3x4npkPHs%2BXxEjegwAwTy1798GeQRr1P2N0tC6rDLy%2FcsTA8298m%2FmPIEuD7351Fhb0hR3JQ%3D%3D";
    private final String serviceKey = "90QVMyD6DDbxum3x4npkPHs+XxEjegwAwTy1798GeQRr1P2N0tC6rDLy/csTA8298m/mPIEuD7351Fhb0hR3JQ==";
    @GetMapping
    public void regionTest() throws Exception{
//        int[] areaCode = {1, 2, 3, 4, 5, 6, 7, 8, 31, 32};

        StringBuilder urlBuilder = new StringBuilder("http://apis.data.go.kr/B551011/KorService/areaCode");
//        urlBuilder.append("?" + URLEncoder.encode("ServiceKey", "UTF-8") + "=" + serviceKey);
        urlBuilder.append("?" + URLEncoder.encode("ServiceKey", "UTF-8") + "="+"90QVMyD6DDbxum3x4npkPHs%2BXxEjegwAwTy1798GeQRr1P2N0tC6rDLy%2FcsTA8298m%2FmPIEuD7351Fhb0hR3JQ%3D%3D");
//                    urlBuilder.append("&" + URLEncoder.encode("ServiceKey", "UTF-8") + "=" + URLEncoder.encode("서비스키UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("numOfRows", "UTF-8") + "=" + URLEncoder.encode("10", "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("pageNo", "UTF-8") + "=" + URLEncoder.encode("1", "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("MobileOS", "UTF-8") + "=" + URLEncoder.encode("ETC", "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("MobileApp", "UTF-8") + "=" + URLEncoder.encode("AppTest", "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("_type", "UTF-8") + "=" + URLEncoder.encode("json", "UTF-8"));
//        urlBuilder.append("&" + URLEncoder.encode("listYN", "UTF-8") + "=" + URLEncoder.encode("Y", "UTF-8"));
//        urlBuilder.append("&" + URLEncoder.encode("areaCode", "UTF-8") + "=" + URLEncoder.encode(String.valueOf(i), "UTF-8"));
        URL url = new URL(urlBuilder.toString());
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-type", "application/json");

        System.out.println("Region Response code: " + conn.getResponseCode());

        BufferedReader rd;
        if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
            rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        } else {
            rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
        }
        //SERVICE_ACCESS_DENIED_ERROR or SERVICE KEY IS NOT REGISTERED ERROR 발생 다시 서비스키 발급 받아볼 것!
        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = rd.readLine()) != null) {
            sb.append(line);
        }
        rd.close();
        conn.disconnect();
        System.out.println(sb.toString());

        JsonParser parser = new JsonParser();
        JsonObject obj = parser.parse(sb.toString()).getAsJsonObject();

        JsonArray arr = obj.get("response").getAsJsonObject()
                .get("body").getAsJsonObject()
                .get("items").getAsJsonObject()
                .get("item").getAsJsonArray();
        List<Area> areaList = new ArrayList<>();
        for (JsonElement jsonElement : arr) {
            JsonObject temp = jsonElement.getAsJsonObject();
            Area area = Area.builder()
                    .siCode(temp.get("code") == null ? -1 :Integer.parseInt(temp.get("code").getAsString()))
                    .siName(temp.get("name") == null ? "wrong answer" :temp.get("name").getAsString())
                    .build();

            areaList.add(area);
        }

        for(Area area : areaList){
            System.out.println(area.getSiCode() + " " + area.getSiName());
        }
    }
}
