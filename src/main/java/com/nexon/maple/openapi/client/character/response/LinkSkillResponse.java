package com.nexon.maple.openapi.client.character.response;

import com.nexon.maple.openapi.client.character.response.linkskill.CharacterLinkSkill;
import com.nexon.maple.openapi.client.character.response.linkskill.CharacterOwnedLinkSkill;
import lombok.Getter;
import lombok.Setter;
import java.util.List;


@Setter
@Getter
public class LinkSkillResponse {
    private String date;
    private String characterClass;
    private List<CharacterLinkSkill> characterLinkSkill;
    private CharacterOwnedLinkSkill characterOwnedLinkSkill;




}
