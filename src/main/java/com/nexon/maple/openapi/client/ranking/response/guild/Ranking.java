package com.nexon.maple.openapi.client.ranking.response.guild;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Ranking {
    private String date;
    private long ranking;
    private String guildName;
    private String worldName;
    private int guildLevel;
    private String guildMasterName;
    private String guildMark;
    private int guildPoint;
}
