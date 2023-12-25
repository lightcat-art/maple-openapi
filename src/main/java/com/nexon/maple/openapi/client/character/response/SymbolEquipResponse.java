package com.nexon.maple.openapi.client.character.response;

import com.nexon.maple.openapi.client.character.response.symbolequip.Symbol;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class SymbolEquipResponse {
    private String date;
    private String characterClass;
    private List<Symbol> symbol;

}
