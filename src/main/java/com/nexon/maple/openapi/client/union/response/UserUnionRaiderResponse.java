package com.nexon.maple.openapi.client.union.response;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class UserUnionRaiderResponse {
    private String date;
    private List<String> unionRaiderStat;
    private List<String> unionOccupiedStat;
    private List<UnionInnerStat> unionInnerStat;
    private List<UnionBlock> unionBlock;

    @Getter
    @Setter
    @ToString
    private static class UnionInnerStat {
        private String statFieldId;
        private String statFieldEffect;
    }

    @Getter
    @Setter
    @ToString
    private static class UnionBlock {
        private String blockType;
        private String blockClass;
        private String blockLevel;
        private BlockControlPoint blockControlPoint;
        private List<BlockPosition> blockPosition;

        @Getter
        @Setter
        @ToString
        private static class BlockControlPoint {
            private int x;
            private int y;
        }

        @Getter
        @Setter
        @ToString
        private static class BlockPosition {
            private int x;
            private int y;
        }
    }

}
