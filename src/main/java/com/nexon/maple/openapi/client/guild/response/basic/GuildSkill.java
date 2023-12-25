package com.nexon.maple.openapi.client.guild.response.basic;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class GuildSkill {
    private String skillName;
    private String skillDescription;
    private int skillLevel;
    private String skillEffect;
    private String skillIcon;
}
