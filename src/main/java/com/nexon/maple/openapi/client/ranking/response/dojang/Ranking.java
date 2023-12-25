package com.nexon.maple.openapi.client.ranking.response.dojang;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Ranking {
    private String date;
    private long ranking;
    private String characterName;
    private String worldName;
    private String className;
    private String subClassName;
    private int characterLevel;
    private int dojangFloor;
    private int dojangTimeRecord;
}