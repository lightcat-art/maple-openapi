package com.nexon.maple.api.user.union.response;


import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UserUnionRaiderResponse {
    private String date;
    private String unionRaiderStat;
    private String unionOccupiedStat;
    private List<UnionInnerStat> unionInnerStat;
    private List<UnionBlock> unionBlock;

    @Getter
    @Setter
    private static class UnionInnerStat {
        private String statFieldId;
        private String statFieldEffect;
    }

    @Getter
    @Setter
    private static class UnionBlock {
        private String blockType;
        private String blockClass;
        private String blockLevel;
        private BlockControlPoint blockControlPoint;
        private List<BlockPosition> blockPosition;

        @Getter
        @Setter
        private static class BlockControlPoint {
            private int x;
            private int y;
        }

        @Getter
        @Setter
        private static class BlockPosition {
            private int x;
            private int y;
        }
    }

}
