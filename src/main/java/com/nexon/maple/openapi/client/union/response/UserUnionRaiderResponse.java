package com.nexon.maple.openapi.client.union.response;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.nexon.maple.openapi.client.union.response.raider.UnionBlock;
import com.nexon.maple.openapi.client.union.response.raider.UnionInnerStat;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserUnionRaiderResponse {
    private String date;
    private List<String> unionRaiderStat;
    private List<String> unionOccupiedStat;
    private List<UnionInnerStat> unionInnerStat;
    private List<UnionBlock> unionBlock;
}
