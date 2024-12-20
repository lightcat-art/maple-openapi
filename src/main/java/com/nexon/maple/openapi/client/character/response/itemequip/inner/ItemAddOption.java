package com.nexon.maple.openapi.client.character.response.itemequip.inner;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ItemAddOption {
    private String str;
    private String dex;
    @JsonProperty("int")
    private String intel;
    private String luk;
    private String maxHp;
    private String maxMp;
    private String attackPower;
    private String magicPower;
    private String armor;
    private String speed;
    private String jump;
    private String bossDamage;
    private String damage;
    private String allStat;
    private int equipmentLevelDecrease;
}
