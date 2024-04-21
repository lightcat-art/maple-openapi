package com.nexon.maple.model.rank;

import lombok.Getter;

@Getter
public enum RankingDojangType {
    COMMON(0), // 일반
    MASTER(1); // 통달

    final private int type;

    private RankingDojangType(int type) {
        this.type = type;
    }
}