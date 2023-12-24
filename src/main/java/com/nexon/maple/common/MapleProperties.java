package com.nexon.maple.common;


import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Getter
@Setter
@RequiredArgsConstructor
@Component
@ConfigurationProperties("api")
public class MapleProperties {
    private String key;
    private String base;

    @Getter
    @Setter
    @ConfigurationProperties("api.character")
    public static class Character {
        private String ocid;
        private String basic;
        private String popularity;
        private String stat;
        private String hyperstat;
        private String propensity;
        private String ability;
        private String itemequip;
        private String cashequip;
        private String symbolequip;
        private String seteffect;
        private String beautyequip;
        private String androidequip;
        private String petequip;
        private String skill;
        private String linkskill;
        private String vmatrix;
        private String hexamatrix;
        private String hexamatrixstat;
        private String dojang;
    }

    @Getter
    @Setter
    @ConfigurationProperties("api.user")
    public static class User {
        private String union;
        private String unionraider;
    }

    @Getter
    @Setter
    @ConfigurationProperties("api.guild")
    public static class Guild {
        private String id;
        private String basic;
    }

    @Getter
    @Setter
    @ConfigurationProperties("api.ranking")
    public static class Ranking {
        private String overall;
        private String union;
        private String guild;
        private String dojang;
        private String theseed;
        private String achievement;
    }

}
