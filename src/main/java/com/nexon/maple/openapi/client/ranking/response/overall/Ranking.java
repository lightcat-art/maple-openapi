package com.nexon.maple.openapi.client.ranking.response.overall;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@JsonIgnoreProperties(ignoreUnknown = true)
public class Ranking {
    private String date;
    private long ranking;
    private String characterName;
    private String worldName;
    private String className;
    private String subClassName;
    private int characterLevel;
    private long characterExp;
    private int characterPopularity;
    private String characterGuildname;
}