package com.nexon.maple.openapi.client.ranking.response;

import com.nexon.maple.openapi.client.ranking.response.union.Ranking;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class RankingUnionResponse {
    private List<Ranking> ranking;
}
