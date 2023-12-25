package com.nexon.maple.openapi.client.ranking.response.achieve;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Ranking {
    private String date;
    private long ranking;
    private String characterName;
    private String worldName;
    private String className;
    private String subClassName;
    private String trophyGrade;
    private long trophyScore;
}
