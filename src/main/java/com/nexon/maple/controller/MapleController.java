package com.nexon.maple.controller;


import com.nexon.maple.cache.ResponseCacheManager;
import com.nexon.maple.common.DateManager;
import com.nexon.maple.model.character.overall.CharacterOverallRequest;
import com.nexon.maple.model.character.overall.CharacterOverallResponse;
import com.nexon.maple.openapi.client.character.*;
import com.nexon.maple.openapi.client.character.response.*;
import com.nexon.maple.openapi.client.guild.GuildBasicApi;
import com.nexon.maple.openapi.client.guild.GuildIdApi;
import com.nexon.maple.openapi.client.guild.response.GuildBasicResponse;
import com.nexon.maple.openapi.client.guild.response.GuildIdResponse;
import com.nexon.maple.openapi.client.ranking.*;
import com.nexon.maple.openapi.client.ranking.response.*;
import com.nexon.maple.openapi.client.union.UserUnionApi;
import com.nexon.maple.openapi.client.union.UserUnionRaiderApi;
import com.nexon.maple.openapi.client.union.response.UserUnionRaiderResponse;
import com.nexon.maple.openapi.client.union.response.UserUnionResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@RestController //@RestController = @Controller + @ResponseBody
public class MapleController {
    Logger logger = LoggerFactory.getLogger(MapleController.class);

    @Autowired
    IdApi idApi;
    @Autowired
    BasicApi basicApi;
    @Autowired
    AbilityApi abilityApi;
    @Autowired
    AndroidEquipApi androidEquipApi;
    @Autowired
    BeautyEquipApi beautyEquipApi;
    @Autowired
    CashItemEquipApi cashItemEquipApi;
    @Autowired
    DojangApi dojangApi;
    @Autowired
    HexaMatrixApi hexaMatrixApi;
    @Autowired
    HexaMatrixStatApi hexaMatrixStatApi;
    @Autowired
    HyperStatApi hyperStatApi;
    @Autowired
    ItemEquipApi itemEquipApi;
    @Autowired
    LinkSkillApi linkSkillApi;
    @Autowired
    PetEquipApi petEquipApi;
    @Autowired
    PopularityApi popularityApi;
    @Autowired
    PropensityApi propensityApi;
    @Autowired
    SetEffectApi setEffectApi;
    @Autowired
    SkillApi skillApi;
    @Autowired
    StatApi statApi;
    @Autowired
    SymbolEquipApi symbolEquipApi;
    @Autowired
    VMatrixApi vMatrixApi;

    @Autowired
    GuildBasicApi guildBasicApi;
    @Autowired
    GuildIdApi guildIdApi;

    @Autowired
    RankingOverallApi rankingOverallApi;
    @Autowired
    RankingGuildApi rankingGuildApi;
    @Autowired
    RankingAchievementApi rankingAchievementApi;
    @Autowired
    RankingDojangApi rankingDojangApi;
    @Autowired
    RankingTheSeedApi rankingTheSeedApi;
    @Autowired
    RankingUnionApi rankingUnionApi;

    @Autowired
    UserUnionApi userUnionApi;
    @Autowired
    UserUnionRaiderApi userUnionRaiderApi;

    @GetMapping("/api/char/overall")
    public CharacterOverallResponse getCharOverall(CharacterOverallRequest request) {
        String formattedNow = DateManager.getSearchDate();

        logger.info("request nickname = " + request.getNickname() + ", now = " + formattedNow);
        // 필요에 따라 key 저장방식을 ocid로 바꾸는것도 고려 필요.
        if (ResponseCacheManager.getInstance().getCharacterCacheMap().containsKey(request.getNickname())) {
            logger.info("Use Cache. character name = " + request.getNickname());
            return ResponseCacheManager.getInstance().getCharacterCache(request.getNickname());
        }

        // ocid 가져오기
        IdResponse idRes = idApi.get(request.getNickname());
        if (idRes == null) {
            logger.error("해당 캐릭터 정보가 생성되지 않음.");
            return null;
        }


        BasicResponse basicResponse = basicApi.get(idRes.getOcid(), formattedNow);
        PopularityResponse popularityResponse = popularityApi.get(idRes.getOcid(), formattedNow);
//        StatResponse statResponse = statApi.get(idRes.getOcid(), formattedNow);
//        HyperStatResponse hyperStatResponse = hyperStatApi.get(idRes.getOcid(), formattedNow);
//        PropensityResponse propensityResponse = propensityApi.get(idRes.getOcid(), formattedNow);
//        AbilityResponse abilityResponse = abilityApi.get(idRes.getOcid(), formattedNow);
//        ItemEquipResponse itemEquipResponse = itemEquipApi.get(idRes.getOcid(), formattedNow);
//        CashItemEquipResponse cashItemEquipResponse = cashItemEquipApi.get(idRes.getOcid(), formattedNow);
//        SymbolEquipResponse symbolEquipResponse = symbolEquipApi.get(idRes.getOcid(), formattedNow);
//        SetEffectResponse setEffectResponse = setEffectApi.get(idRes.getOcid(), formattedNow);
//        BeautyEquipResponse beautyEquipResponse = beautyEquipApi.get(idRes.getOcid(), formattedNow);
//        AndroidEquipResponse androidEquipResponse = androidEquipApi.get(idRes.getOcid(), formattedNow);
//        PetEquipResponse petEquipResponse = petEquipApi.get(idRes.getOcid(), formattedNow);
//        // 하이퍼 패시브
//        SkillResponse skillResponseHp = skillApi.get(idRes.getOcid(), formattedNow, "hyperpassive");
//        // 하이퍼 액티브
//        SkillResponse skillResponseHa = skillApi.get(idRes.getOcid(), formattedNow, "hyperactive");
//        // 5차
//        SkillResponse skillResponse5 = skillApi.get(idRes.getOcid(), formattedNow, "5");
//        // 6차
//        SkillResponse skillResponse6 = skillApi.get(idRes.getOcid(), formattedNow, "6");
//        LinkSkillResponse linkSkillResponse = linkSkillApi.get(idRes.getOcid(), formattedNow);
//        VMatrixResponse vMatrixResponse = vMatrixApi.get(idRes.getOcid(), formattedNow);
//        HexaMatrixResponse hexaMatrixResponse = hexaMatrixApi.get(idRes.getOcid(), formattedNow);
//        HexaMatrixStatResponse hexaMatrixStatResponse = hexaMatrixStatApi.get(idRes.getOcid(), formattedNow);
//        DojangResponse dojangResponse = dojangApi.get(idRes.getOcid(), formattedNow);

        // 유니온 랭킹 정보
        RankingUnionResponse rankingUnionResponse = rankingUnionApi
                .get(formattedNow, basicResponse.getWorldName(), idRes.getOcid(), 1);

//        String myClassNamFull = rankingUnionResponse.getRanking().get(0).getClassName()
//                + "-" + rankingUnionResponse.getRanking().get(0).getSubClassName();
//        String wholeClassNmFull = rankingUnionResponse.getRanking().get(0).getClassName() + "-" + "전체 전직";
//        // 종합 랭킹 정보
//        RankingOverallResponse rankingOverallMyClassResponse = rankingOverallApi
//                .get(formattedNow, basicResponse.getWorldName(), 0, myClassNamFull, idRes.getOcid(), 1);
//
//        RankingOverallResponse rankOverallWholeClassResponse = rankingOverallApi
//                .get(formattedNow, basicResponse.getWorldName(), 0, wholeClassNmFull, idRes.getOcid(), 1);
//
//
//        int difficulty = 1; //무릉도장 조회 구간은 통달으로 통일.
//        // 무릉도장 랭킹 정보
//        RankingDojangResponse rankDojangMyClassResponse = rankingDojangApi.get(formattedNow, basicResponse.getWorldName(), difficulty,
//                myClassNamFull, idRes.getOcid(), 1);
//        RankingDojangResponse rankDojangWholeClassResponse = rankingDojangApi.get(formattedNow, basicResponse.getWorldName(), difficulty,
//                wholeClassNmFull, idRes.getOcid(), 1);
//
//        RankingTheSeedResponse rankingTheSeedResponse = rankingTheSeedApi.get(formattedNow, basicResponse.getWorldName(), idRes.getOcid(), 1);
//
//        RankingAchievementResponse rankingAchievementResponse = rankingAchievementApi.get(formattedNow, idRes.getOcid(), 1);

        UserUnionResponse userUnionResponse = userUnionApi.get(idRes.getOcid(), formattedNow);

        UserUnionRaiderResponse userUnionRaiderResponse = userUnionRaiderApi.get(idRes.getOcid(), formattedNow);

        CharacterOverallResponse out = CharacterOverallResponse.builder()
                .basicResponse(basicResponse)
                .popularityResponse(popularityResponse)
//                .statResponse(statResponse)
//                .hyperStatResponse(hyperStatResponse)
//                .propensityResponse(propensityResponse).abilityResponse(abilityResponse)
//                .itemEquipResponse(itemEquipResponse)
//                .cashItemEquipResponse(cashItemEquipResponse)
//                .symbolEquipResponse(symbolEquipResponse).setEffectResponse(setEffectResponse)
//                .beautyEquipResponse(beautyEquipResponse).androidEquipResponse(androidEquipResponse)
//                .petEquipResponse(petEquipResponse).skillResponseHp(skillResponseHp)
//                .skillResponseHa(skillResponseHa).skillResponse5(skillResponse5)
//                .skillResponse6(skillResponse6).linkSkillResponse(linkSkillResponse)
//                .vMatrixResponse(vMatrixResponse).hexaMatrixResponse(hexaMatrixResponse)
//                .hexaMatrixStatResponse(hexaMatrixStatResponse).dojangResponse(dojangResponse)
//                .rankingUnionResponse(rankingUnionResponse)
//                .rankingOverallMyClassResponse(rankingOverallMyClassResponse)
//                .rankingOverallWholeClassResponse(rankOverallWholeClassResponse)
//                .rankingDojangMyClassResponse(rankDojangMyClassResponse)
//                .rankingDojangWholeClassResponse(rankDojangWholeClassResponse)
                .rankingUnionResponse(rankingUnionResponse)
//                .rankingAchievementResponse(rankingAchievementResponse)
                .userUnionResponse(userUnionResponse)
                .userUnionRaiderResponse(userUnionRaiderResponse)
                .build();
        ResponseCacheManager.getInstance().addCharacterCache(request.getNickname(), out);
        //
        return out;
    }

    @GetMapping("/api/char/banner")
    public CharacterOverallResponse getCharBanner(CharacterOverallRequest request) {
        String formattedNow = DateManager.getSearchDate();
        IdResponse idRes = null;
        if (ResponseCacheManager.getInstance().getCharacterCache(request.getNickname()) == null) {
            idRes = idApi.get(request.getNickname());
            CharacterOverallResponse out = CharacterOverallResponse.builder().idResponse(idRes).build();
            // api 걸리는 시간을 고려하여 다시한번 체크
            if (ResponseCacheManager.getInstance().getCharacterCache(request.getNickname()) == null) {
                ResponseCacheManager.getInstance().addCharacterCache(request.getNickname(), out);
            }
        } else {
            idRes = ResponseCacheManager.getInstance().getCharacterCache(request.getNickname()).getIdResponse();
        }

        // 필요한 기능 체크 후 없다면 api call.
        if (ResponseCacheManager.getInstance().getCharacterCache(request.getNickname()).getBasicResponse() == null) {
            BasicResponse basicResponse = basicApi.get(idRes.getOcid(), formattedNow);
            ResponseCacheManager.getInstance().getCharacterCache(request.getNickname()).setBasicResponse(basicResponse);
        } else {
            logger.info("Use getBasicResponse Cache. character name = " + request.getNickname());
        }
        if (ResponseCacheManager.getInstance().getCharacterCache(request.getNickname()).getPopularityResponse() == null) {
            PopularityResponse popularityResponse = popularityApi.get(idRes.getOcid(), formattedNow);
            ResponseCacheManager.getInstance().getCharacterCache(request.getNickname()).setPopularityResponse(popularityResponse);
        } else {
            logger.info("Use getPopularityResponse Cache. character name = " + request.getNickname());
        }
        return ResponseCacheManager.getInstance().getCharacterCache(request.getNickname());
    }


    @GetMapping("/api/char/union-all")
    public CharacterOverallResponse getCharUnionAll(CharacterOverallRequest request) {
        String formattedNow = DateManager.getSearchDate();
        IdResponse idRes = null;
        if (ResponseCacheManager.getInstance().getCharacterCache(request.getNickname()) == null) {
            idRes = idApi.get(request.getNickname());
            CharacterOverallResponse out = CharacterOverallResponse.builder().idResponse(idRes).build();
            // api 걸리는 시간을 고려하여 다시한번 체크
            if (ResponseCacheManager.getInstance().getCharacterCache(request.getNickname()) == null) {
                ResponseCacheManager.getInstance().addCharacterCache(request.getNickname(), out);
            }
        } else {
            idRes = ResponseCacheManager.getInstance().getCharacterCache(request.getNickname()).getIdResponse();
        }

        // 필요한 기능 체크 후 없다면 api call.
        if (ResponseCacheManager.getInstance().getCharacterCache(request.getNickname()).getBasicResponse() == null) {
            BasicResponse basicResponse = basicApi.get(idRes.getOcid(), formattedNow);
            ResponseCacheManager.getInstance().getCharacterCache(request.getNickname()).setBasicResponse(basicResponse);
        }
        if (ResponseCacheManager.getInstance().getCharacterCache(request.getNickname()).getRankingUnionResponse() == null) {
            RankingUnionResponse rankingUnionResponse = rankingUnionApi
                    .get(formattedNow, ResponseCacheManager.getInstance().getCharacterCache(
                            request.getNickname()).getBasicResponse().getWorldName(), idRes.getOcid(), 1);
            ResponseCacheManager.getInstance().getCharacterCache(request.getNickname()).setRankingUnionResponse(rankingUnionResponse);
        }
        if (ResponseCacheManager.getInstance().getCharacterCache(request.getNickname()).getUserUnionResponse() == null) {
            UserUnionResponse userUnionResponse = userUnionApi.get(idRes.getOcid(), formattedNow);
            ResponseCacheManager.getInstance().getCharacterCache(request.getNickname()).setUserUnionResponse(userUnionResponse);
        }
        if (ResponseCacheManager.getInstance().getCharacterCache(request.getNickname()).getUserUnionRaiderResponse() == null) {
            UserUnionRaiderResponse userUnionRaiderResponse = userUnionRaiderApi.get(idRes.getOcid(), formattedNow);
            ResponseCacheManager.getInstance().getCharacterCache(request.getNickname()).setUserUnionRaiderResponse(userUnionRaiderResponse);
        }
        if (ResponseCacheManager.getInstance().getCharacterCache(request.getNickname()).getGuildIdResponse() == null ||
                ResponseCacheManager.getInstance().getCharacterCache(request.getNickname()).getGuildBasicResponse() == null) {
            GuildIdResponse guildIdResponse = guildIdApi.get(
                    ResponseCacheManager.getInstance().getCharacterCache(request.getNickname()).getBasicResponse().getCharacterGuildName(),
                    ResponseCacheManager.getInstance().getCharacterCache(request.getNickname()).getBasicResponse().getWorldName());
            GuildBasicResponse guildBasicResponse = guildBasicApi.get(guildIdResponse.getOguildId(), formattedNow);
            ResponseCacheManager.getInstance().getCharacterCache(request.getNickname()).setGuildIdResponse(guildIdResponse);
            ResponseCacheManager.getInstance().getCharacterCache(request.getNickname()).setGuildBasicResponse(guildBasicResponse);
        }
        return ResponseCacheManager.getInstance().getCharacterCache(request.getNickname());
    }

    @GetMapping("/api/char/id")
    public String getCharOcid() {
        IdResponse idres = idApi.get("마하포드");
        logger.info("ouid = " + idres.getOcid());
        return null;
    }

    @GetMapping("/api/char/basic")
    public String getCharBasic() {
        IdResponse idres = idApi.get("마하포드");
        logger.info("ouid = " + idres.getOcid());
        BasicResponse basicRes = basicApi.get(idres.getOcid(), "2023-12-21");
        logger.info("response tostring = " + basicRes.toString());
        return null;
    }

    @GetMapping("/api/char/symbol")
    public String getCharSymbol() {
        IdResponse idres = idApi.get("마하포드");
        logger.info("ouid = " + idres.getOcid());
        SymbolEquipResponse symbolRes = symbolEquipApi.get(idres.getOcid(), "2023-12-22");
        logger.info("response tostring = " + symbolRes.toString());
        return null;
    }

    @GetMapping("/api/char/ability")
    public String getCharAbility() {
        IdResponse idres = idApi.get("마하포드");
        logger.info("ouid = " + idres.getOcid());
        AbilityResponse symbolRes = abilityApi.get(idres.getOcid(), "2023-12-23");
        logger.info("response tostring = " + symbolRes.toString());
        return null;
    }

    @GetMapping("/api/char/android-equip")
    public String getCharAndroidEquip() {
        IdResponse idres = idApi.get("마하포드");
        logger.info("ouid = " + idres.getOcid());
        AndroidEquipResponse symbolRes = androidEquipApi.get(idres.getOcid(), "2023-12-22");
        logger.info("response tostring = " + symbolRes.toString());
        return null;
    }

    @GetMapping("/api/char/beauty-equip")
    public String getCharBeautyEquip() {
        IdResponse idres = idApi.get("마하포드");
        logger.info("ouid = " + idres.getOcid());
        BeautyEquipResponse symbolRes = beautyEquipApi.get(idres.getOcid(), "2023-12-22");
        logger.info("response tostring = " + symbolRes.toString());
        return null;
    }

    @GetMapping("/api/char/cashitem-equip")
    public String getCharCashItemEquip() {
        IdResponse idres = idApi.get("마하포드");
        logger.info("ouid = " + idres.getOcid());
        CashItemEquipResponse symbolRes = cashItemEquipApi.get(idres.getOcid(), "2023-12-22");
        logger.info("response tostring = " + symbolRes.toString());
        return null;
    }

    @GetMapping("/api/char/dojang")
    public String getCharDojang() {
        IdResponse idres = idApi.get("마하포드");
        logger.info("ouid = " + idres.getOcid());
        DojangResponse symbolRes = dojangApi.get(idres.getOcid(), "2023-12-22");
        logger.info("response tostring = " + symbolRes.toString());
        return null;
    }

    @GetMapping("/api/char/hexamatrix")
    public String getCharHexaMatrix() {
        IdResponse idres = idApi.get("마하포드");
        logger.info("ouid = " + idres.getOcid());
        HexaMatrixResponse symbolRes = hexaMatrixApi.get(idres.getOcid(), "2023-12-22");
        logger.info("response tostring = " + symbolRes.toString());
        return null;
    }

    @GetMapping("/api/char/hexamatrix-stat")
    public String getCharHexaMatrixStat() {
        IdResponse idres = idApi.get("마하포드");
        logger.info("ouid = " + idres.getOcid());
        HexaMatrixStatResponse symbolRes = hexaMatrixStatApi.get(idres.getOcid(), "2023-12-22");
        logger.info("response tostring = " + symbolRes.toString());
        return null;
    }

    @GetMapping("/api/char/hyperstat")
    public String getCharHyperStat() {
        IdResponse idres = idApi.get("마하포드");
        logger.info("ouid = " + idres.getOcid());
        HyperStatResponse symbolRes = hyperStatApi.get(idres.getOcid(), "2023-12-22");
        logger.info("response tostring = " + symbolRes.toString());
        return null;
    }

    @GetMapping("/api/char/item-equip")
    public String getCharItemEquip() {
        IdResponse idres = idApi.get("마하포드");
        logger.info("ouid = " + idres.getOcid());
        ItemEquipResponse symbolRes = itemEquipApi.get(idres.getOcid(), "2023-12-22");
        logger.info("response tostring = " + symbolRes.toString());
        return null;
    }

    @GetMapping("/api/char/linkskill")
    public String getCharLinkSkill() {
        IdResponse idres = idApi.get("마하포드");
        logger.info("ouid = " + idres.getOcid());
        LinkSkillResponse symbolRes = linkSkillApi.get(idres.getOcid(), "2023-12-22");
        logger.info("response tostring = " + symbolRes.toString());
        return null;
    }

    @GetMapping("/api/char/pet-equip")
    public String getCharPetEquip() {
        IdResponse idres = idApi.get("마하포드");
        logger.info("ouid = " + idres.getOcid());
        PetEquipResponse symbolRes = petEquipApi.get(idres.getOcid(), "2023-12-22");
        logger.info("response tostring = " + symbolRes.toString());
        return null;
    }

    @GetMapping("/api/char/popularity")
    public String getCharPopularity() {
        IdResponse idres = idApi.get("마하포드");
        logger.info("ouid = " + idres.getOcid());
        PopularityResponse symbolRes = popularityApi.get(idres.getOcid(), "2023-12-22");
        logger.info("response tostring = " + symbolRes.toString());
        return null;
    }

    @GetMapping("/api/char/propensity")
    public String getCharPropensity() {
        IdResponse idres = idApi.get("마하포드");
        logger.info("ouid = " + idres.getOcid());
        PropensityResponse symbolRes = propensityApi.get(idres.getOcid(), "2023-12-22");
        logger.info("response tostring = " + symbolRes.toString());
        return null;
    }

    @GetMapping("/api/char/seteffect")
    public String getCharSetEffect() {
        IdResponse idres = idApi.get("마하포드");
        logger.info("ouid = " + idres.getOcid());
        SetEffectResponse symbolRes = setEffectApi.get(idres.getOcid(), "2023-12-22");
        logger.info("response tostring = " + symbolRes.toString());
        return null;
    }

    @GetMapping("/api/char/skill")
    public String getCharSkill() {
        IdResponse idres = idApi.get("마하포드");
        logger.info("ouid = " + idres.getOcid());
        SkillResponse symbolRes = skillApi.get(idres.getOcid(), "2023-12-22", "6");
        logger.info("response tostring = " + symbolRes.toString());
        return null;
    }

    @GetMapping("/api/char/stat")
    public String getCharStat() {
        IdResponse idres = idApi.get("마하포드");
        logger.info("ouid = " + idres.getOcid());
        StatResponse symbolRes = statApi.get(idres.getOcid(), "2023-12-22");
        logger.info("response tostring = " + symbolRes.toString());
        return null;
    }

    @GetMapping("/api/char/vmatrix")
    public String getCharVMatrix() {
        IdResponse idres = idApi.get("마하포드");
        logger.info("ouid = " + idres.getOcid());
        VMatrixResponse symbolRes = vMatrixApi.get(idres.getOcid(), "2023-12-22");
        logger.info("response tostring = " + symbolRes.toString());
        return null;
    }

    //==================================================

    @GetMapping("/api/guild/id")
    public String getGuildInfo() {
        GuildIdResponse res = guildIdApi.get("리제", "리부트");
        logger.info("response tostring = " + res.toString());
        GuildBasicResponse res2 = guildBasicApi.get(res.getOguildId(), "2023-12-23");
        logger.info("response tostring = " + res2.toString());
        return null;
    }

    @GetMapping("/api/ranking/overall")
    public String getRankOverall() {
        IdResponse idres = idApi.get("마하포드");
        logger.info("ouid = " + idres.getOcid());
//        RankingOverallResponse res = rankingOverallApi.get("2023-12-22","리부트", 0, "기사단-미하일", idres.getOcid(), 1);
        RankingOverallResponse res = rankingOverallApi.get("2023-12-22", "리부트", 1, "기사단-미하일", idres.getOcid(), 10000);
        logger.info("response tostring = " + res.toString());
        return null;
    }

    @GetMapping("/api/ranking/achieve")
    public String getRankAchieve() {
        IdResponse idres = idApi.get("마하포드");
        logger.info("ouid = " + idres.getOcid());
        RankingAchievementResponse res = rankingAchievementApi.get("2023-12-22", idres.getOcid(), 1);
        logger.info("response tostring = " + res.toString());
        return null;
    }

    @GetMapping("/api/ranking/dojang")
    public String getRankDojang() {
        IdResponse idres = idApi.get("꾸부기");
        logger.info("ouid = " + idres.getOcid());
        RankingDojangResponse res = rankingDojangApi.get("2023-12-24", "리부트", 0, "레지스탕스-전체 전직", idres.getOcid(), 1);
        RankingDojangResponse res2 = rankingDojangApi.get("2023-12-24", "리부트", 0, "레지스탕스-배틀메이지", idres.getOcid(), 1);
        RankingDojangResponse res3 = rankingDojangApi.get("2023-12-24", "리부트", 1, "레지스탕스-전체 전직", idres.getOcid(), 1);
        RankingDojangResponse res4 = rankingDojangApi.get("2023-12-24", "리부트", 1, "레지스탕스-배틀메이지", idres.getOcid(), 1);
        //무릉 기록이 없으면 ranking 안에 빈 리스트가 return
//        logger.info("response tostring = " + res.toString());
        return null;
    }

    @GetMapping("/api/ranking/guild")
    public String getRankGuild() {
        RankingGuildResponse res = rankingGuildApi.get("2023-12-22", "리부트", 2, "리제", 1);
        logger.info("response tostring = " + res.toString());
        return null;
    }

    @GetMapping("/api/ranking/theseed")
    public String getRankTheSeed() {
        IdResponse idres = idApi.get("마하포드");
        logger.info("ouid = " + idres.getOcid());
        RankingTheSeedResponse res = rankingTheSeedApi.get("2023-12-22", "리부트", idres.getOcid(), 1);
        //무릉 기록이 없으면 ranking 안에 빈 리스트가 return
        logger.info("response tostring = " + res.toString());
        return null;
    }

    @GetMapping("/api/ranking/union")
    public String getRankUnion() {
        IdResponse idres = idApi.get("마하포드");
        logger.info("ouid = " + idres.getOcid());
        RankingUnionResponse res = rankingUnionApi.get("2023-12-22", "리부트", idres.getOcid(), 3);
        // 다른 월드 기록까지 가져오네...? 그 정보는 배제할까..?
        logger.info("response tostring = " + res.toString());
        return null;
    }

    //===============================================
    @GetMapping("/api/user/union")
    public String getUserUnion() {
        IdResponse idres = idApi.get("마하포드");
        logger.info("ouid = " + idres.getOcid());
        UserUnionResponse res = userUnionApi.get(idres.getOcid(), "2023-12-22");
        logger.info("response tostring = " + res.toString());
        return null;
    }

    @GetMapping("/api/user/union-raider")
    public String getUserUnionRaider() {
        IdResponse idres = idApi.get("마하포드");
        logger.info("ouid = " + idres.getOcid());
        UserUnionRaiderResponse res = userUnionRaiderApi.get(idres.getOcid(), "2023-12-22");
        logger.info("response tostring = " + res.toString());
        return null;
    }
}
