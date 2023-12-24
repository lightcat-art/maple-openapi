package com.nexon.maple.api.character.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.nexon.maple.api.character.response.petequip.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class PetEquipResponse {
    private String date;
    @JsonProperty("pet_1_name")
    private String pet1Name;
    @JsonProperty("pet_1_nickname")
    private String pet1Nickname;
    @JsonProperty("pet_1_icon")
    private String pet1Icon;
    @JsonProperty("pet_1_description")
    private String pet1Description;
    @JsonProperty("pet_1_equipment")
    private Pet1Equipment pet1Equipment;
    @JsonProperty("pet_1_auto_skill")
    private Pet1AutoSkill pet1AutoSkill;
    @JsonProperty("pet_1_pet_type")
    private String pet1PetType;
    @JsonProperty("pet_1_skill")
    private List<String> pet1Skill;
    @JsonProperty("pet_1_date_expire")
    private String pet1DateExpire;

    @JsonProperty("pet_2_name")
    private String pet2Name;
    @JsonProperty("pet_2_nickname")
    private String pet2Nickname;
    @JsonProperty("pet_2_icon")
    private String pet2Icon;
    @JsonProperty("pet_2_description")
    private String pet2Description;
    @JsonProperty("pet_2_equipment")
    private Pet2Equipment pet2Equipment;
    @JsonProperty("pet_2_auto_skill")
    private Pet2AutoSkill pet2AutoSkill;
    @JsonProperty("pet_2_pet_type")
    private String pet2PetType;
    @JsonProperty("pet_2_skill")
    private List<String> pet2Skill;
    @JsonProperty("pet_2_date_expire")
    private String pet2DateExpire;

    @JsonProperty("pet_3_name")
    private String pet3Name;
    @JsonProperty("pet_3_nickname")
    private String pet3Nickname;
    @JsonProperty("pet_3_icon")
    private String pet3Icon;
    @JsonProperty("pet_3_description")
    private String pet3Description;
    @JsonProperty("pet_3_equipment")
    private Pet3Equipment pet3Equipment;
    @JsonProperty("pet_3_auto_skill")
    private Pet3AutoSkill pet3AutoSkill;
    @JsonProperty("pet_3_pet_type")
    private String pet3PetType;
    @JsonProperty("pet_3_skill")
    private List<String> pet3Skill;
    @JsonProperty("pet_3_date_expire")
    private String pet3DateExpire;
}
