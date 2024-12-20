package com.nexon.maple.openapi.client.ranking;

import com.nexon.maple.openapi.client.ranking.response.RankingTheSeedResponse;
import com.nexon.maple.common.MapleProperties;
import com.nexon.maple.common.ObjectMapperManager;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.impl.client.BasicResponseHandler;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.net.URI;

@Component
public class RankingTheSeedApi {
    @Autowired
    private MapleProperties mapleProperties;

    @Autowired
    private MapleProperties.Ranking rankingProperties;

    Logger logger = LoggerFactory.getLogger(RankingTheSeedApi.class);

    public RankingTheSeedResponse get(String date, String worldName, String ocid, int page) {
        try {
            URI uri = new URIBuilder(mapleProperties.getBase() + rankingProperties.getTheseed())
                    .addParameter("date", date)
                    .addParameter("world_name", worldName)
                    .addParameter("ocid", ocid)
                    .addParameter("page", String.valueOf(page))
                    .build();
            HttpGet getRequest = new HttpGet(uri); //GET 메소드 URL 생성

            getRequest.addHeader("x-nxopen-api-key", mapleProperties.getKey()); //KEY 입력

            CloseableHttpClient client = HttpClients.createDefault();
            CloseableHttpResponse response = (CloseableHttpResponse) client
                    .execute(getRequest);

            //Response 출력
            if (response.getStatusLine().getStatusCode() == 200) {
                ResponseHandler<String> handler = new BasicResponseHandler();
                String body = handler.handleResponse(response);
//                logger.info(body);
                RankingTheSeedResponse res = ObjectMapperManager.camelToSnakeJsonMapper.readValue(body, RankingTheSeedResponse.class);
                return res;
            } else {
                logger.error("response is error : " + response.getStatusLine().getStatusCode());
                return null;
            }
        } catch (Exception e) {
            logger.error("error occurred.",e);
            return null;
        }
    }

    public RankingTheSeedResponse getTop(String date) {
        try {
            URI uri = new URIBuilder(mapleProperties.getBase() + rankingProperties.getTheseed())
                    .addParameter("date", date)
                    .build();
            HttpGet getRequest = new HttpGet(uri); //GET 메소드 URL 생성

            getRequest.addHeader("x-nxopen-api-key", mapleProperties.getKey()); //KEY 입력

            CloseableHttpClient client = HttpClients.createDefault();
            CloseableHttpResponse response = (CloseableHttpResponse) client
                    .execute(getRequest);

            //Response 출력
            if (response.getStatusLine().getStatusCode() == 200) {
                ResponseHandler<String> handler = new BasicResponseHandler();
                String body = handler.handleResponse(response);
//                logger.info(body);
                RankingTheSeedResponse res = ObjectMapperManager.camelToSnakeJsonMapper.readValue(body, RankingTheSeedResponse.class);
                return res;
            } else {
                logger.error("response is error : " + response.getStatusLine().getStatusCode());
                return null;
            }
        } catch (Exception e) {
            logger.error("error occurred.",e);
            return null;
        }
    }
}
