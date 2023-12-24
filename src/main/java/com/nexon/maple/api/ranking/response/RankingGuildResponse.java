package com.nexon.maple.api.ranking.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class RankingGuildResponse {
    private List<Ranking> ranking;

    @Getter
    @Setter
    private static class Ranking {
        private String date;
        private long ranking;
        private String guildName;
        private String worldName;
        private int guildLevel;
        private String guildMasterName;
        private String guildMark;
        private int guildPoint;
    }
}
