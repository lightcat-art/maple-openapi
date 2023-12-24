package com.nexon.maple.openapi.client.character.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class SetEffectResponse {
    private String date;
    private List<SetEffect> setEffect;

    @Getter
    @Setter
    private static class SetEffect {
        private String setName;
        private int totalSetCount;
        private List<SetEffectInfo> setEffectInfo;

        @Getter
        @Setter
        private static class SetEffectInfo {
            private int setCount;
            private String setOption;
        }
    }
}
