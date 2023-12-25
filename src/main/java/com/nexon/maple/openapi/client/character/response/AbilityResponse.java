package com.nexon.maple.openapi.client.character.response;

import com.nexon.maple.openapi.client.character.response.ability.AbilityInfo;
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
}
