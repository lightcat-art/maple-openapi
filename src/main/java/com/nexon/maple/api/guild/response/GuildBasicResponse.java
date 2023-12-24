package com.nexon.maple.api.guild.response;


import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class GuildBasicResponse {
    private String date;
    private String worldName;
    private String guildName;
    private int guildLevel;
    private long guildFame;
    private int guildPoint;
    private String guildMasterName;
    private int guildMemberCount;
    private String guildMember;
    private List<GuildSkill> guildSkill;
    private List<GuildNoblessSkill> guildNoblessSkill;
    private String guildMark;
    private String guildMarkCustom; //base64 encoding format

    @Getter
    @Setter
    private static class GuildSkill {
        private String skillName;
        private String skillDescription;
        private int skillLevel;
        private String skillEffect;
        private String skillIcon;
    }

    @Getter
    @Setter
    private static class GuildNoblessSkill {
        private String skillName;
        private String skillDescription;
        private int skillLevel;
        private String skillEffect;
        private String skillIcon;
    }
}
