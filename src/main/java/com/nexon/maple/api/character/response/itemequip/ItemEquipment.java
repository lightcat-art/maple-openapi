package com.nexon.maple.api.character.response.itemequip;

import com.nexon.maple.api.character.response.itemequip.inner.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ItemEquipment {
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
    private String potentialOptionGrade;
    private String additionalPotentialOptionGrade;
    private String potentialOption1;
    private String potentialOption2;
    private String potentialOption3;
    private String additionalPotentialOption1;
    private String additionalPotentialOption2;
    private String additionalPotentialOption3;
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
