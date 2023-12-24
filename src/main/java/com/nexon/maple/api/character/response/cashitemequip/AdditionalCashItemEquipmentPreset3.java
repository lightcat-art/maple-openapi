package com.nexon.maple.api.character.response.cashitemequip;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdditionalCashItemEquipmentPreset3 {
    private String cashItemEquipmentPart;
    private String cashItemEquipmentSlot;
    private String cashItemName;
    private String cashItemIcon;
    private String cashItemDescription;
    private CashItemOption cashItemOption;
    private String dateExpire;
    private String dateOptionExpire;
    private String cashItemLabel;
    private CashItemColoringPrism cashItemColoringPrism;
    private String basePresetItemDisableFlag;
}
