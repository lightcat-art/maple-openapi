package com.nexon.maple.openapi.client.character.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.nexon.maple.openapi.character.response.cashitemequip.*;
import com.nexon.maple.openapi.client.character.response.cashitemequip.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class CashItemEquipResponse {
    private String date;
    private String characterGender;
    private String characterClass;
    private long presetNo;
    @JsonProperty("cash_item_equipment_preset_1")
    private List<CashItemEquipmentPreset1> cashItemEquipmentPreset1;
    @JsonProperty("cash_item_equipment_preset_2")
    private List<CashItemEquipmentPreset2> cashItemEquipmentPreset2;
    @JsonProperty("cash_item_equipment_preset_3")
    private List<CashItemEquipmentPreset3> cashItemEquipmentPreset3;
    @JsonProperty("additional_cash_item_equipment_preset_1")
    private List<AdditionalCashItemEquipmentPreset1> additionalCashItemEquipmentPreset1;
    @JsonProperty("additional_cash_item_equipment_preset_2")
    private List<AdditionalCashItemEquipmentPreset2> additionalCashItemEquipmentPreset2;
    @JsonProperty("additional_cash_item_equipment_preset_3")
    private List<AdditionalCashItemEquipmentPreset3> additionalCashItemEquipmentPreset3;
}
