package com.nexon.maple.model.rank;

import lombok.Getter;

@Getter
public enum RankingGuildType {
    POINT(0),
    FLAG(1),
    SURO(2);

    final private int type;

    private RankingGuildType(int type) {
        this.type = type;
    }
}


