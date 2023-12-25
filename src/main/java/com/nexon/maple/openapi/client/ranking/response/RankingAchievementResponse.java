package com.nexon.maple.openapi.client.ranking.response;

import com.nexon.maple.openapi.client.ranking.response.achieve.Ranking;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class RankingAchievementResponse {
    private List<Ranking> ranking;

}
