package com.nexon.maple.openapi.client.character.response.seteffect;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class SetEffect {
    private String setName;
    private int totalSetCount;
    private List<SetEffectInfo> setEffectInfo;

}
