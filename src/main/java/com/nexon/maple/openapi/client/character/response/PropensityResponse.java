package com.nexon.maple.openapi.client.character.response;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PropensityResponse {
    private String date;
    private int charismaLevel;
    private int sensibilityLevel;
    private int insightLevel;
    private int willingnessLevel;
    private int handicraftLevel;
    private int charmLevel;
}
