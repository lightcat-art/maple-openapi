package com.nexon.maple.api.ranking.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class RankingOverallResponse {
    private List<Ranking> ranking;

    @Getter
    @Setter
    @ToString
    private static class Ranking {
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
}