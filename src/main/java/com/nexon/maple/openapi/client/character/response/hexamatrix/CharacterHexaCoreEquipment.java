package com.nexon.maple.openapi.client.character.response.hexamatrix;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class CharacterHexaCoreEquipment {
    private String hexaCoreName;
    private int hexaCoreLevel;
    private String hexaCoreType;
    private List<LinkedSkill> linkedSkill;
}
