package com.nexon.maple.openapi.client.character.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class AbilityResponse {
    private String date;
    private String abilityGrade;
    private List<AbilityInfo> abilityInfo;
    private String remainFame;


    @Setter
    @Getter
    private static class AbilityInfo {
        private String abilityNo;
        private String abilityGrade;
        private String abilityValue;
    }
}
