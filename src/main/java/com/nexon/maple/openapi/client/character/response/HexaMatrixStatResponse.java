package com.nexon.maple.openapi.client.character.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.nexon.maple.openapi.client.character.response.hexamatrixstat.CharacterHexaStatCore;
import com.nexon.maple.openapi.client.character.response.hexamatrixstat.PresetHexaStatCore;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class HexaMatrixStatResponse {
    private String date;
    private String characterClass;
    private List<CharacterHexaStatCore> characterHexaStatCore;
    private List<PresetHexaStatCore> presetHexaStatCore;

}
