package com.nexon.maple.api.character.response.itemequip.inner;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ItemStarforceOption {
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
}
