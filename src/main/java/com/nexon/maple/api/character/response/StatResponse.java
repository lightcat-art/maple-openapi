package com.nexon.maple.api.character.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class StatResponse {
    private String date;
    private String characterClass;
    private List<FinalStat> finalStat;
    private int remainAp;

    @Getter
    @Setter
    private static class FinalStat {
        private String statName;
        private String statValue;
    }
}
