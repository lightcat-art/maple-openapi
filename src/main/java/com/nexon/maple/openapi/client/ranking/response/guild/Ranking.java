package com.nexon.maple.openapi.client.ranking.response.guild;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
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
