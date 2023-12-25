package com.nexon.maple.openapi.client.character.response;

import com.nexon.maple.openapi.client.character.response.seteffect.SetEffect;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class SetEffectResponse {
    private String date;
    private List<SetEffect> setEffect;


}
