package com.nexon.maple.openapi.client.character.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class SymbolEquipResponse {
    private String date;
    private String characterClass;
    private List<Symbol> symbol;

    @Getter
    @Setter
    private static class Symbol {
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
}
