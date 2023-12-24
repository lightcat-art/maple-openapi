package com.nexon.maple.api.character.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class VMatrixResponse {
    private String date;
    private String characterClass;
    private List<CharacterVCoreEquipment> characterVCoreEquipment;
    private int characterVMatrixRemainSlotUpgradePoint;

    @Getter
    @Setter
    private static class CharacterVCoreEquipment {
        private String slotId;
        private int slotLevel;
        private String VCoreName;
        private String VCoreType;
        private int VCoreLevel;
        private String VCoreSkill1;
        private String VCoreSkill2;
        private String VCoreSkill3;
    }
}
