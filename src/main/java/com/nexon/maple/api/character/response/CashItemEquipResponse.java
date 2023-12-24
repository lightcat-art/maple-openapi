package com.nexon.maple.api.character.response;

import com.nexon.maple.api.character.response.cashitemequip.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CashItemEquipResponse {
    private String date;
    private String characterGender;
    private String characterClass;
    private long presetNo;
    private CashItemEquipmentPreset1 cashItemEquipmentPreset1;
    private CashItemEquipmentPreset2 cashItemEquipmentPreset2;
    private CashItemEquipmentPreset3 cashItemEquipmentPreset3;
    private AdditionalCashItemEquipmentPreset1 additionalCashItemEquipmentPreset1;
    private AdditionalCashItemEquipmentPreset2 additionalCashItemEquipmentPreset2;
    private AdditionalCashItemEquipmentPreset3 additionalCashItemEquipmentPreset3;
}
