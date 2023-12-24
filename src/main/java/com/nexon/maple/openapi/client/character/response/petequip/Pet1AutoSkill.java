package com.nexon.maple.openapi.client.character.response.petequip;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Pet1AutoSkill {
    @JsonProperty("skill_1")
    private String skill1;
    @JsonProperty("skill_1_icon")
    private String skill1Icon;
    @JsonProperty("skill_2")
    private String skill2;
    @JsonProperty("skill_2_icon")
    private String skill2Icon;
}
