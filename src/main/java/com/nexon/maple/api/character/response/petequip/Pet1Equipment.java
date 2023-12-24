package com.nexon.maple.api.character.response.petequip;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class Pet1Equipment {
    private String itemName;
    private String itemIcon;
    private String itemDescription;
    private List<ItemOption> itemOption;
    private int scrollUpgrade;
    private int scrollUpgradable;
}
