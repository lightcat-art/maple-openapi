package com.nexon.maple.openapi.client.union.response;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserUnionResponse {
    private String date;
    private int unionLevel;
    private String unionGrade;
    private int unionArtifactLevel;
    private int unionArtifactExp;
    private int unionArtifactPoint;
}
