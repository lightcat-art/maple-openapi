package com.nexon.maple.openapi.client.ranking.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.nexon.maple.openapi.client.ranking.response.dojang.Ranking;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class RankingDojangResponse {
    private List<Ranking> ranking;

}
