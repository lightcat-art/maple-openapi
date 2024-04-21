package com.nexon.maple.openapi.client.ranking;

import com.nexon.maple.openapi.client.ranking.response.RankingGuildResponse;
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
public class RankingGuildApi {
    @Autowired
    private MapleProperties mapleProperties;

    @Autowired
    private MapleProperties.Ranking rankingProperties;

    Logger logger = LoggerFactory.getLogger(RankingGuildApi.class);

    /**
     *
     * @param date
     * @param worldName Available values :
     * 스카니아, 베라, 루나, 제니스, 크로아, 유니온, 엘리시움, 이노시스,
     * 레드, 오로라, 아케인, 노바, 리부트, 리부트2, 버닝, 버닝2, 버닝3
     * @param rankingType 랭킹 타입 (0:주간 명성치, 1:플래그 레이스, 2:지하 수로)
     * @param guildName
     * @param page 페이지번호
     * @return
     */
    public RankingGuildResponse get(String date, String worldName, int rankingType, String guildName, int page) {
        try {
            URI uri = new URIBuilder(mapleProperties.getBase() + rankingProperties.getGuild())
                    .addParameter("date", date)
                    .addParameter("world_name", worldName)
                    .addParameter("ranking_type", String.valueOf(rankingType))
                    .addParameter("guild_name", guildName)
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
                RankingGuildResponse res = ObjectMapperManager.camelToSnakeJsonMapper.readValue(body, RankingGuildResponse.class);
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

    public RankingGuildResponse getTop(String date, int rankingType) {
        try {
            URI uri = new URIBuilder(mapleProperties.getBase() + rankingProperties.getGuild())
                    .addParameter("date", date)
                    .addParameter("ranking_type", String.valueOf(rankingType))
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
                RankingGuildResponse res = ObjectMapperManager.camelToSnakeJsonMapper.readValue(body, RankingGuildResponse.class);
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
