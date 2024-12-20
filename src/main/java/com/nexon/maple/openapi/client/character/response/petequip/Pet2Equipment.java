package com.nexon.maple.openapi.client.character.response.petequip;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class Pet2Equipment {
    private String itemName;
    private String itemIcon;
    private String itemDescription;
    private List<ItemOption> itemOption;
    private int scrollUpgrade;
    private int scrollUpgradable;
}
