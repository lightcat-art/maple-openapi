package com.nexon.maple.openapi.client.union.response.raider;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@JsonIgnoreProperties(ignoreUnknown = true)
public class UnionInnerStat {
    private String statFieldId;
    private String statFieldEffect;
}
