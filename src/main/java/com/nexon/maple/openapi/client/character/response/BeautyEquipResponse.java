package com.nexon.maple.openapi.client.character.response;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class BeautyEquipResponse {
    private String date;
    private String characterGender;
    private String characterClass;
    private CharacterHair characterHair;
    private CharacterFace characterFace;
    private String characterSkinName;
    private AdditionalCharacterHair additionalCharacterHair;
    private AdditionalCharacterFace additionalCharacterFace;
    //제로인 경우 베타, 엔젤릭버스터인 경우 드레스 업 모드에 적용 중인 피부 명
    private String additionalCharacterSkinName;

    @Setter
    @Getter
    private static class CharacterHair {
        private String hairName;
        private String baseColor;
        private String mixColor;
        private String mixRate;
    }
    @Setter
    @Getter
    private static class CharacterFace {
        private String faceName;
        private String baseColor;
        private String mixColor;
        private String mixRate;
    }

    @Setter
    @Getter
    private static class AdditionalCharacterHair {
        private String hairName;
        private String baseColor;
        private String mixColor;
        private String mixRate;
    }
    @Setter
    @Getter
    private static class AdditionalCharacterFace {
        private String faceName;
        private String baseColor;
        private String mixColor;
        private String mixRate;
    }
}
