package com.nexon.maple.openapi.client.character.response.androidequip;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AndroidCashItemEquipment {
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

}
