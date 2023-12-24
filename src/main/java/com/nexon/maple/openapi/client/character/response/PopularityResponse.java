package com.nexon.maple.openapi.client.character.response;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PopularityResponse {
    private String date;
    private long popularity;
}
