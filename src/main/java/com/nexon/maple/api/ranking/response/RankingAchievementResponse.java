package com.nexon.maple.api.ranking.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class RankingAchievementResponse {
    private List<Ranking> ranking;

    @Getter
    @Setter
    private static class Ranking {
        private String date;
        private long ranking;
        private String characterName;
        private String worldName;
        private String className;
        private String subClassName;
        private String trophyGrade;
        private long trophyScore;
    }
}
