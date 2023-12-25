package com.nexon.maple.openapi.client.ranking.response;

import com.nexon.maple.openapi.client.ranking.response.dojang.Ranking;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class RankingDojangResponse {
    private List<Ranking> ranking;

}
