package com.nexon.maple.openapi.client.ranking.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.nexon.maple.openapi.client.ranking.response.union.Ranking;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class RankingUnionResponse {
    private List<Ranking> ranking;
}
