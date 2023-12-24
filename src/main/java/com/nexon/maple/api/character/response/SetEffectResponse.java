package com.nexon.maple.api.character.response;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class SetEffectResponse {
    private String date;
    private SetEffect setEffect;

    @Getter
    @Setter
    private static class SetEffect {
        private String setName;
        private int totalSetCount;
        private SetEffectInfo setEffectInfo;

        @Getter
        @Setter
        private static class SetEffectInfo {
            private int setCount;
            private String setOption;
        }
    }
}
