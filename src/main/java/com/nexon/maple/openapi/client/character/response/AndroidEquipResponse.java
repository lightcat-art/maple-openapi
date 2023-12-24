package com.nexon.maple.openapi.client.character.response;

import com.nexon.maple.openapi.client.character.response.androidequip.AndroidCashItemEquipment;
import com.nexon.maple.openapi.client.character.response.androidequip.AndroidFace;
import com.nexon.maple.openapi.client.character.response.androidequip.AndroidHair;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class AndroidEquipResponse {
    private String date;
    private String androidName;
    private String androidNickname;
    private String androidIcon;
    private String androidDescription;
    private AndroidHair androidHair;
    private AndroidFace androidFace;
    private String androidSkinName;
    private List<AndroidCashItemEquipment> androidCashItemEquipment;
    private String androidEarSensorClipFlag;
}
