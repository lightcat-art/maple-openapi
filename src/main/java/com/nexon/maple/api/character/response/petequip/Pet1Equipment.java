package com.nexon.maple.api.character.response.petequip;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Pet1Equipment {
    private String itemName;
    private String itemIcon;
    private String itemDescription;
    private ItemOption itemOption;
    private int scrollUpgrade;
    private int scrollUpgradeable;
}
