package com.nexon.maple.api.character.response;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class HyperStatResponse {
    private String date;
    private String characterClass;
    private String usePresetNo;
    private int useAvailableHyperStat;
    private HyperStatPreset1 hyperStatPreset1;
    private int hyperStatPreset1RemainPoint;
    private HyperStatPreset2 hyperStatPreset2;
    private int hyperStatPreset2RemainPoint;
    private HyperStatPreset3 hyperStatPreset3;
    private int hyperStatPreset3RemainPoint;

    @Getter
    @Setter
    private static class HyperStatPreset1 {
        private String statType;
        private int statPoint;
        private int statLevel;
        private String statIncrease;
    }
    @Getter
    @Setter
    private static class HyperStatPreset2 {
        private String statType;
        private int statPoint;
        private int statLevel;
        private String statIncrease;
    }
    @Getter
    @Setter
    private class HyperStatPreset3 {
        private String statType;
        private int statPoint;
        private int statLevel;
        private String statIncrease;
    }
}
