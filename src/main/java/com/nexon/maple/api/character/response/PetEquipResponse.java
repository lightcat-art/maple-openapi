package com.nexon.maple.api.character.response;

import com.nexon.maple.api.character.response.petequip.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PetEquipResponse {
    private String date;
    private String pet1Name;
    private String pet1Nickname;
    private String pet1Icon;
    private String pet1Description;
    private Pet1Equipment pet1Equipment;
    private Pet1AutoSkill pet1AutoSkill1;
    private String pet1PetType;
    private String pet1Skill;
    private String pet1DateExpire;

    private String pet2Name;
    private String pet2Nickname;
    private String pet2Icon;
    private String pet2Description;
    private Pet2Equipment pet2Equipment;
    private Pet2AutoSkill pet2AutoSkill1;
    private String pet2PetType;
    private String pet2Skill;
    private String pet2DateExpire;

    private String pet3Name;
    private String pet3Nickname;
    private String pet3Icon;
    private String pet3Description;
    private Pet3Equipment pet3Equipment;
    private Pet3AutoSkill pet3AutoSkill1;
    private String pet3PetType;
    private String pet3Skill;
    private String pet3DateExpire;
}
