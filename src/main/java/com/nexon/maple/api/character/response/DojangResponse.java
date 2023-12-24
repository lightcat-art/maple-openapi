package com.nexon.maple.api.character.response;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class DojangResponse {
    private String date;
    private String characterClass;
    private String worldName;
    private int dojangBestFloor;
    private String dateDojangRecord;
    private int dojangBestTime;

}
