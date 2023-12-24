package com.nexon.maple.openapi.client.character.response.cashitemequip;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class AdditionalCashItemEquipmentPreset1 {
    private String cashItemEquipmentPart;
    private String cashItemEquipmentSlot;
    private String cashItemName;
    private String cashItemIcon;
    private String cashItemDescription;
    private List<CashItemOption> cashItemOption;
    private String dateExpire;
    private String dateOptionExpire;
    private String cashItemLabel;
    private CashItemColoringPrism cashItemColoringPrism;
    private String basePresetItemDisableFlag;
}
