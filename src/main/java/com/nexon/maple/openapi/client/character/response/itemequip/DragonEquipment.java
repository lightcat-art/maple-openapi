package com.nexon.maple.openapi.client.character.response.itemequip;

import com.nexon.maple.openapi.client.character.response.itemequip.inner.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DragonEquipment {
    //에반인 경우 응답됨.
    private String itemEquipmentPart;
    private String equipmentSlot;
    private String itemName;
    private String itemIcon;
    private String itemDescription;
    private String itemShapeName;
    private String itemShapeIcon;
    private String gender;
    private ItemTotalOption itemTotalOption;
    private ItemBaseOption itemBaseOption;
    private int equipmentLevelIncrease;
    private ItemExceptionalOption itemExceptionalOption;
    private ItemAddOption itemAddOption;
    private int growthExp;
    private int growthLevel;
    private String scrollUpgrade;
    private String cuttableCount;
    private String goldenHammerFlag;
    private String scrollResilienceCount;
    private String scrollUpgradeableCount;
    private String soulName;
    private String soulOption;
    private ItemEtcOption itemEtcOption;
    private String starforce;
    private String starforceScrollFlag;
    private ItemStarforceOption itemStarforceOption;
    private int specialRingLevel;
    private String dateExpire;
}
