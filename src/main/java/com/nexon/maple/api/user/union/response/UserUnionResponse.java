package com.nexon.maple.api.user.union.response;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserUnionResponse {
    private String date;
    private int unionLevel;
    private String unionGrade;
}
