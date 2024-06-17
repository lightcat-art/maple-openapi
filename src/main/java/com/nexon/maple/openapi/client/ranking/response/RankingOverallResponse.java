package com.nexon.maple.openapi.client.ranking.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.nexon.maple.openapi.client.ranking.response.overall.Ranking;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
@JsonIgnoreProperties(ignoreUnknown = true)
public class RankingOverallResponse {
    private List<Ranking> ranking;


}
