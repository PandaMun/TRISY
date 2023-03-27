package com.c202.trisy.service;

import com.c202.trisy.dto.Area;
import com.c202.trisy.dto.MainCat;
import com.c202.trisy.dto.MiddleCat;
import com.c202.trisy.entity.Region;
import com.c202.trisy.entity.Spot;
import com.c202.trisy.entity.Theme;
import com.c202.trisy.repository.RegionRepository;
import com.c202.trisy.repository.SpotRepository;
import com.c202.trisy.repository.ThemeRepository;
import com.google.gson.*;
import com.google.gson.stream.JsonReader;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.StringReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ApiService {
    @Value("${trisy.serviceKey}")
    private String serviceKey;

    private final RegionRepository regionRepository;
    private final ThemeRepository themeRepository;
    private final SpotRepository spotRepository;
    public List<Area> getSi() throws IOException {
        StringBuilder urlBuilder = new StringBuilder("http://apis.data.go.kr/B551011/KorService1/areaCode1");
        urlBuilder.append("?" + URLEncoder.encode("serviceKey", "UTF-8") + "=" + serviceKey);
        urlBuilder.append("&" + URLEncoder.encode("numOfRows", "UTF-8") + "=" + URLEncoder.encode("20", "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("pageNo", "UTF-8") + "=" + URLEncoder.encode("1", "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("MobileOS", "UTF-8") + "=" + URLEncoder.encode("ETC", "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("MobileApp", "UTF-8") + "=" + URLEncoder.encode("AppTest", "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("_type", "UTF-8") + "=" + URLEncoder.encode("json", "UTF-8"));

        URL url = new URL(urlBuilder.toString());
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-type", "application/json");

        System.out.println("Area Response code: " + conn.getResponseCode());

        JsonObject obj = getConnectJsonObject(conn);

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

        return areaList;
    }



    public void saveRegion(List<Area> areaList) throws IOException {
        for(Area area : areaList){
            StringBuilder urlBuilder = new StringBuilder("http://apis.data.go.kr/B551011/KorService1/areaCode1");
            urlBuilder.append("?" + URLEncoder.encode("serviceKey", "UTF-8") + "=" + serviceKey);
            urlBuilder.append("&" + URLEncoder.encode("numOfRows", "UTF-8") + "=" + URLEncoder.encode("35", "UTF-8"));
            urlBuilder.append("&" + URLEncoder.encode("pageNo", "UTF-8") + "=" + URLEncoder.encode("1", "UTF-8"));
            urlBuilder.append("&" + URLEncoder.encode("MobileOS", "UTF-8") + "=" + URLEncoder.encode("ETC", "UTF-8"));
            urlBuilder.append("&" + URLEncoder.encode("MobileApp", "UTF-8") + "=" + URLEncoder.encode("AppTest", "UTF-8"));
            urlBuilder.append("&" + URLEncoder.encode("_type", "UTF-8") + "=" + URLEncoder.encode("json", "UTF-8"));
            urlBuilder.append("&" + URLEncoder.encode("areaCode", "UTF-8") + "=" + URLEncoder.encode(String.valueOf(area.getSiCode()), "UTF-8"));
            URL url = new URL(urlBuilder.toString());

            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Content-type", "application/json");

            System.out.println(area.getSiName() + " Region Response code: " + conn.getResponseCode());

            JsonObject obj = getConnectJsonObject(conn);

            JsonArray arr = obj.get("response").getAsJsonObject()
                    .get("body").getAsJsonObject()
                    .get("items").getAsJsonObject()
                    .get("item").getAsJsonArray();

            for (JsonElement jsonElement : arr) {
                JsonObject temp = jsonElement.getAsJsonObject();

                Region region = Region.builder()
                        .siCode(area.getSiCode())
                        .siName(area.getSiName())
                        .guGunCode(temp.get("code") == null ? -1 :Integer.parseInt(temp.get("code").getAsString()))
                        .guGunName(temp.get("name") == null ? "wrong answer" :temp.get("name").getAsString())
                        .build();

                regionRepository.save(region);
                System.out.println(region.toString());
            }

        }

    }
    public void saveTheme() throws IOException {
        StringBuilder urlBuilder = new StringBuilder("http://apis.data.go.kr/B551011/KorService1/categoryCode1");
        urlBuilder.append("?" + URLEncoder.encode("serviceKey", "UTF-8") + "=" + serviceKey);
        urlBuilder.append("&" + URLEncoder.encode("numOfRows", "UTF-8") + "=" + URLEncoder.encode("100", "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("pageNo", "UTF-8") + "=" + URLEncoder.encode("1", "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("MobileOS", "UTF-8") + "=" + URLEncoder.encode("ETC", "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("MobileApp", "UTF-8") + "=" + URLEncoder.encode("AppTest", "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("_type", "UTF-8") + "=" + URLEncoder.encode("json", "UTF-8"));

        URL url = new URL(urlBuilder.toString());
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-type", "application/json");

        System.out.println("MainCat Response code: " + conn.getResponseCode());

        JsonObject obj = getConnectJsonObject(conn);

        JsonArray arr = obj.get("response").getAsJsonObject()
                .get("body").getAsJsonObject()
                .get("items").getAsJsonObject()
                .get("item").getAsJsonArray();
        List<MainCat> mainCatList = new ArrayList<>();
        for (JsonElement jsonElement : arr) {
            JsonObject temp = jsonElement.getAsJsonObject();
            MainCat mainCat = MainCat.builder()
                    .mainCode(temp.get("code") == null ? "wrong answer" :temp.get("code").getAsString())
                    .mainName(temp.get("name") == null ? "wrong answer" :temp.get("name").getAsString())
                    .build();

            mainCatList.add(mainCat);
        }
        saveThemeMiddle(mainCatList);

    }
    public void saveThemeMiddle(List<MainCat> mainCatList) throws IOException {
        for (MainCat mainCat : mainCatList) {
            StringBuilder urlBuilder = new StringBuilder("http://apis.data.go.kr/B551011/KorService1/categoryCode1");
            urlBuilder.append("?" + URLEncoder.encode("serviceKey", "UTF-8") + "=" + serviceKey);
            urlBuilder.append("&" + URLEncoder.encode("numOfRows", "UTF-8") + "=" + URLEncoder.encode("100", "UTF-8"));
            urlBuilder.append("&" + URLEncoder.encode("pageNo", "UTF-8") + "=" + URLEncoder.encode("1", "UTF-8"));
            urlBuilder.append("&" + URLEncoder.encode("MobileOS", "UTF-8") + "=" + URLEncoder.encode("ETC", "UTF-8"));
            urlBuilder.append("&" + URLEncoder.encode("MobileApp", "UTF-8") + "=" + URLEncoder.encode("AppTest", "UTF-8"));
            urlBuilder.append("&" + URLEncoder.encode("_type", "UTF-8") + "=" + URLEncoder.encode("json", "UTF-8"));
            urlBuilder.append("&" + URLEncoder.encode("cat1", "UTF-8") + "=" + URLEncoder.encode(mainCat.getMainCode(), "UTF-8"));
            URL url = new URL(urlBuilder.toString());
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Content-type", "application/json");

            System.out.println("MiddleCat Response code: " + conn.getResponseCode());

            JsonObject obj = getConnectJsonObject(conn);

            JsonArray arr = obj.get("response").getAsJsonObject()
                    .get("body").getAsJsonObject()
                    .get("items").getAsJsonObject()
                    .get("item").getAsJsonArray();
            List<MiddleCat> middleCatList = new ArrayList<>();
            for (JsonElement jsonElement : arr) {
                JsonObject temp = jsonElement.getAsJsonObject();
                MiddleCat middleCat = MiddleCat.builder()
                        .mainCode(mainCat.getMainCode())
                        .mainName(mainCat.getMainName())
                        .middleCode(temp.get("code") == null ? "wrong answer" : temp.get("code").getAsString())
                        .middleName(temp.get("name") == null ? "wrong answer" : temp.get("name").getAsString())
                        .build();

                middleCatList.add(middleCat);
            }
            saveThemeSub(middleCatList);
        }
    }
    public void saveThemeSub(List<MiddleCat> middleCatList) throws IOException {
        for (MiddleCat middleCat : middleCatList) {
            StringBuilder urlBuilder = new StringBuilder("http://apis.data.go.kr/B551011/KorService1/categoryCode1");
            urlBuilder.append("?" + URLEncoder.encode("serviceKey", "UTF-8") + "=" + serviceKey);
            urlBuilder.append("&" + URLEncoder.encode("numOfRows", "UTF-8") + "=" + URLEncoder.encode("100", "UTF-8"));
            urlBuilder.append("&" + URLEncoder.encode("pageNo", "UTF-8") + "=" + URLEncoder.encode("1", "UTF-8"));
            urlBuilder.append("&" + URLEncoder.encode("MobileOS", "UTF-8") + "=" + URLEncoder.encode("ETC", "UTF-8"));
            urlBuilder.append("&" + URLEncoder.encode("MobileApp", "UTF-8") + "=" + URLEncoder.encode("AppTest", "UTF-8"));
            urlBuilder.append("&" + URLEncoder.encode("_type", "UTF-8") + "=" + URLEncoder.encode("json", "UTF-8"));
            urlBuilder.append("&" + URLEncoder.encode("cat1", "UTF-8") + "=" + URLEncoder.encode(middleCat.getMainCode(), "UTF-8"));
            urlBuilder.append("&" + URLEncoder.encode("cat2", "UTF-8") + "=" + URLEncoder.encode(middleCat.getMiddleCode(), "UTF-8"));
            URL url = new URL(urlBuilder.toString());
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Content-type", "application/json");

            System.out.println("subCat Response code: " + conn.getResponseCode());

            JsonObject obj = getConnectJsonObject(conn);

            JsonArray arr = obj.get("response").getAsJsonObject()
                    .get("body").getAsJsonObject()
                    .get("items").getAsJsonObject()
                    .get("item").getAsJsonArray();
            List<Theme> themeList = new ArrayList<>();
            for (JsonElement jsonElement : arr) {
                JsonObject temp = jsonElement.getAsJsonObject();
                Theme theme = Theme.builder()
                        .mainCategory(middleCat.getMainCode())
                        .mainName(middleCat.getMainName())
                        .middleCategory(middleCat.getMiddleCode())
                        .middleName(middleCat.getMiddleName())
                        .subCategory(temp.get("code") == null ? "wrong answer" : temp.get("code").getAsString())
                        .subName(temp.get("name") == null ? "wrong answer" : temp.get("name").getAsString())
                        .build();

                themeRepository.save(theme);
            }

        }
    }

    public void saveSpot() throws IOException{
        int totalCount = getTotalCount();

        System.out.println("total count : " + totalCount);
        int numOfRows = 100;
        int repeatCount = totalCount/100 + 1;

        for(int i = 1; i <= repeatCount; i++){
            StringBuilder urlBuilder = new StringBuilder("http://apis.data.go.kr/B551011/KorService1/areaBasedList1");
            urlBuilder.append("?" + URLEncoder.encode("serviceKey", "UTF-8") + "=" + serviceKey);
            urlBuilder.append("&" + URLEncoder.encode("numOfRows", "UTF-8") + "=" + URLEncoder.encode(String.valueOf(numOfRows), "UTF-8"));
            urlBuilder.append("&" + URLEncoder.encode("pageNo", "UTF-8") + "=" + URLEncoder.encode(String.valueOf(i), "UTF-8"));
            urlBuilder.append("&" + URLEncoder.encode("MobileOS", "UTF-8") + "=" + URLEncoder.encode("ETC", "UTF-8"));
            urlBuilder.append("&" + URLEncoder.encode("MobileApp", "UTF-8") + "=" + URLEncoder.encode("AppTest", "UTF-8"));
            urlBuilder.append("&" + URLEncoder.encode("_type", "UTF-8") + "=" + URLEncoder.encode("json", "UTF-8"));
            urlBuilder.append("&" + URLEncoder.encode("listYN", "UTF-8") + "=" + URLEncoder.encode("Y", "UTF-8"));

            URL url = new URL(urlBuilder.toString());
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Content-type", "application/json");


            System.out.println("subCat Response code: " + conn.getResponseCode());

            JsonObject obj = getConnectJsonObject(conn);

            JsonArray arr = obj.get("response").getAsJsonObject()
                    .get("body").getAsJsonObject()
                    .get("items").getAsJsonObject()
                    .get("item").getAsJsonArray();

            for (JsonElement jsonElement : arr) {
                JsonObject temp = jsonElement.getAsJsonObject();
//                System.out.println(temp.get("cat3").getAsString());

                Theme theme = themeRepository.findBySubCategory(temp.get("cat3").getAsString()).orElse(null);

//                System.out.println(temp.get("areacode").getAsString() + " " +temp.get("sigungucode").getAsString());
//                Region region = regionRepository.findByGuGunCodeAndSiCode(Integer.parseInt(temp.get("sigungucode").getAsString()),Integer.parseInt(temp.get("areacode").getAsString())).get();
                int guGunCode = temp.get("sigungucode").getAsString().equals("") ? -1 : Integer.parseInt(temp.get("sigungucode").getAsString());
                int siCode = temp.get("areacode").getAsString().equals("") ? -1 : Integer.parseInt(temp.get("areacode").getAsString());
                Region region = regionRepository.findByGuGunCodeAndSiCode(guGunCode,siCode).orElse(null);
                String contentId = temp.get("contentid").getAsString();

                String detailInfo = getDetailInfo(contentId);
                if(detailInfo == null){
                    continue;
                }
                Spot spot = Spot.builder()
                        .mapY(temp.get("mapy").equals("") ? -1 : Double.parseDouble(temp.get("mapy").getAsString()))
                        .mapX(temp.get("mapx").equals("") ? -1 : Double.parseDouble(temp.get("mapx").getAsString()))
                        .contentId(temp.get("contentid").equals("") ? -1 : Integer.parseInt(temp.get("contentid").getAsString()))
                        .title(temp.get("title") == null ? "wrong answer" : temp.get("title").getAsString())
                        .imageUrl(temp.get("firstimage") == null ? "wrong answer" :temp.get("firstimage").getAsString())
                        .thumbnailUrl(temp.get("firstimage2") == null ? "wrong answer" : temp.get("firstimage2").getAsString())
                        .mainAddress(temp.get("addr1") == null ? "wrong answer" : temp.get("addr1").getAsString())
                        .subAddress(temp.get("addr2") == null ? "wrong answer" : temp.get("addr2").getAsString())
                        .zipCode(temp.get("zipcode").getAsString().equals("")  ?  "wrong answer" : temp.get("zipcode").getAsString())
                        .detailInfo(detailInfo)
                        .region(region)
                        .theme(theme)
                        .build();


                spotRepository.save(spot);
            }



        }



    }
    private String getDetailInfo(String contentId) throws IOException {
        Optional<Spot> getSpot;
        try{
            int contentIdToInt = Integer.parseInt(contentId);
             getSpot = spotRepository.findByContentId(contentIdToInt);
        }catch (NumberFormatException e){
            System.out.println("잘못된 방식의 content id : "+ contentId);
            return "no content id";
        }

        if(!getSpot.isEmpty()){
            return null;
        }
        StringBuilder urlBuilder = new StringBuilder("http://apis.data.go.kr/B551011/KorService1/detailCommon1");
        urlBuilder.append("?" + URLEncoder.encode("serviceKey", "UTF-8") + "=" + serviceKey);
        urlBuilder.append("&" + URLEncoder.encode("MobileOS", "UTF-8") + "=" + URLEncoder.encode("ETC", "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("MobileApp", "UTF-8") + "=" + URLEncoder.encode("AppTest", "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("overviewYN", "UTF-8") + "=" + URLEncoder.encode("Y", "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("_type", "UTF-8") + "=" + URLEncoder.encode("json", "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("contentId", "UTF-8") + "=" + URLEncoder.encode(contentId, "UTF-8"));


        URL url = new URL(urlBuilder.toString());
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-type", "application/json");
        conn.setRequestProperty("Accept", "text/html;");
        System.out.println("get detail info Response code: " + conn.getResponseCode());

        JsonObject obj = getConnectJsonObject(conn);


        JsonArray arr = obj.get("response").getAsJsonObject()
                .get("body").getAsJsonObject()
                .get("items").getAsJsonObject()
                .get("item").getAsJsonArray();

//

        for (JsonElement jsonElement : arr) {
            JsonObject temp = jsonElement.getAsJsonObject();
            if(temp.get("overview") != null){
                return temp.get("overview") == null ? "wrong answer": (temp.get("overview").getAsString());
            }

        }

        return "wrong answer";
    }
    private int getTotalCount() throws IOException {
        StringBuilder urlBuilder = new StringBuilder("http://apis.data.go.kr/B551011/KorService1/areaBasedList1");
        urlBuilder.append("?" + URLEncoder.encode("serviceKey", "UTF-8") + "=" + serviceKey);
        urlBuilder.append("&" + URLEncoder.encode("numOfRows", "UTF-8") + "=" + URLEncoder.encode("20", "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("pageNo", "UTF-8") + "=" + URLEncoder.encode("1", "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("MobileOS", "UTF-8") + "=" + URLEncoder.encode("ETC", "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("MobileApp", "UTF-8") + "=" + URLEncoder.encode("AppTest", "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("listYN", "UTF-8") + "=" + URLEncoder.encode("N", "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("_type", "UTF-8") + "=" + URLEncoder.encode("json", "UTF-8"));

        URL url = new URL(urlBuilder.toString());
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-type", "application/json");

        System.out.println("total count Response code: " + conn.getResponseCode());

        JsonObject obj = getConnectJsonObject(conn);


        JsonArray arr = obj.get("response").getAsJsonObject()
                .get("body").getAsJsonObject()
                .get("items").getAsJsonObject()
                .get("item").getAsJsonArray();

        JsonObject temp = arr.get(0).getAsJsonObject();

        return temp.get("totalCnt") == null ? -1 : Integer.parseInt(temp.get("totalCnt").getAsString());

    }

    private JsonObject getConnectJsonObject(HttpURLConnection conn) throws IOException {
        BufferedReader rd;
        if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
            rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        } else {
            rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
        }
        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = rd.readLine()) != null) {
            sb.append(line);
        }
        rd.close();
        conn.disconnect();
        System.out.println(sb.toString());

        JsonParser parser = new JsonParser();
//        //////////
        JsonReader reader = new JsonReader(new StringReader(sb.toString()));
        reader.setLenient(true);
        JsonObject obj = JsonParser.parseReader(reader).getAsJsonObject();
//        ///////////
//        JsonObject obj = parser.parse(sb.toString()).getAsJsonObject();
        return obj;
    }
}
