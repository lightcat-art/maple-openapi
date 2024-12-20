package com.nexon.maple.openapi.client.character.response;

import com.nexon.maple.openapi.client.character.response.stat.FinalStat;
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

}
