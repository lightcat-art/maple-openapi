package com.nexon.maple.openapi.client.character.response.itemequip;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.nexon.maple.openapi.character.response.itemequip.inner.*;
import com.nexon.maple.openapi.client.character.response.itemequip.inner.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ItemEquipment {
    private String itemEquipmentPart;
    private String itemEquipmentSlot;
    private String itemName;
    private String itemIcon;
    private String itemDescription;
    private String itemShapeName;
    private String itemShapeIcon;
    private String itemGender;
    private ItemTotalOption itemTotalOption;
    private ItemBaseOption itemBaseOption;
    private String potentialOptionGrade;
    private String additionalPotentialOptionGrade;
    @JsonProperty("potential_option_1")
    private String potentialOption1;
    @JsonProperty("potential_option_2")
    private String potentialOption2;
    @JsonProperty("potential_option_3")
    private String potentialOption3;
    @JsonProperty("additional_potential_option_1")
    private String additionalPotentialOption1;
    @JsonProperty("additional_potential_option_2")
    private String additionalPotentialOption2;
    @JsonProperty("additional_potential_option_3")
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
