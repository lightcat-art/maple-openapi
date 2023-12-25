package com.nexon.maple.openapi.client.ranking.response;

import com.nexon.maple.openapi.client.ranking.response.guild.Ranking;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class RankingGuildResponse {
    private List<Ranking> ranking;

}
