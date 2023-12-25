package com.nexon.maple.openapi.client.character.response;

import com.nexon.maple.openapi.client.character.response.hexamatrix.CharacterHexaCoreEquipment;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class HexaMatrixResponse {
    private String date;
    private List<CharacterHexaCoreEquipment> characterHexaCoreEquipment;
}
