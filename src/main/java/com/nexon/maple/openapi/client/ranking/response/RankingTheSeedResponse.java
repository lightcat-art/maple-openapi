package com.nexon.maple.openapi.client.ranking.response;

import com.nexon.maple.openapi.client.ranking.response.theseed.Ranking;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class RankingTheSeedResponse {
    private List<Ranking> ranking;
}
