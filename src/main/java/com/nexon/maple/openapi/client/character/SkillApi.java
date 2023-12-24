package com.nexon.maple.openapi.client.character;

import com.nexon.maple.common.MapleProperties;
import com.nexon.maple.common.ObjectMapperManager;
import com.nexon.maple.openapi.client.character.response.SkillResponse;
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
public class SkillApi {
    @Autowired
    MapleProperties mapleProperties;

    @Autowired
    MapleProperties.Character characterProperties;

    Logger logger = LoggerFactory.getLogger(SkillApi.class);

    /**
     *
     * @param ocid
     * @param date
     * @param charSkillGrade 조회하고자 하는 전직차수 <br>
     * 0: 0차 스킬 및 제로 공용스킬 <br>
     * 1: 1차 스킬 <br>
     * 1.5: 1.5차 스킬 <br>
     * 2: 2차 스킬 <br>
     * 2.5: 2.5차 스킬 <br>
     * 3: 3차 스킬 <br>
     * 4: 4차 스킬 및 제로 알파/베타 스킬 <br>
     * hyperpassive: 하이퍼 패시브 스킬 <br>
     * hyperactive: 하이퍼 액티브 스킬 <br>
     * 5: 5차 스킬 <br>
     * 6: 6차 스킬 <br>
     * @return
     */
    public SkillResponse get(String ocid, String date, String charSkillGrade) {

        try {
            URI uri = new URIBuilder(mapleProperties.getBase() + characterProperties.getSkill())
                    .addParameter("ocid", ocid)
                    .addParameter("date", date)
                    .addParameter("character_skill_grade", charSkillGrade)
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
                logger.info(body);
                SkillResponse res = ObjectMapperManager.camelToSnakeJsonMapper.readValue(body, SkillResponse.class);
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
