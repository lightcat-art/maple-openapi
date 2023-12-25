package com.nexon.maple.openapi.client.character.response.symbolequip;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Symbol {
    private String symbolName;
    private String symbolIcon;
    private String symbolDescription;
    private String symbolForce;
    private int symbolLevel;
    private String symbolStr;
    private String symbolDex;
    private String symbolInt;
    private String symbolLuk;
    private String symbolHp;
    private int symbolGrowthCount;
    private int symbolRequireGrowthCount;
}
