package com.nexon.maple.api.character.response;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Setter
@Getter
public class AbilityResponse {
    private String date;
    private String abilityGrade;
    private List<AbilityInfo> abilityInfo;


    @Setter
    @Getter
    public class AbilityInfo {
        private String abilityNo;
        private String abilityGrade;
        private String abilityValue;
    }
}
