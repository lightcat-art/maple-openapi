package com.nexon.maple.api.character.response;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class StatResponse {
    private String date;
    private String characterClass;
    private FinalStat finalStat;
    private int remainSp;

    @Getter
    @Setter
    private static class FinalStat {
        private String statName;
        private String statValue;
    }
}
