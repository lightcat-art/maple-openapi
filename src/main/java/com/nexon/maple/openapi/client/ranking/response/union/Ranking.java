package com.nexon.maple.openapi.client.ranking.response.union;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class Ranking {
    private String date;
    private long ranking;
    private String characterName;
    private String worldName;
    private String className;
    private String subClassName;
    private int unionLevel;
    private long unionPower;
}
