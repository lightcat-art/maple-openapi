package com.nexon.maple.controller;


import com.nexon.maple.cache.ResponseCacheManager;
import com.nexon.maple.common.DateManager;
import com.nexon.maple.model.character.overall.CharacterOverallRequest;
import com.nexon.maple.model.character.overall.CharacterOverallResponse;
import com.nexon.maple.model.rank.RankingDojangRequest;
import com.nexon.maple.model.rank.RankingDojangType;
import com.nexon.maple.model.rank.RankingGuildRequest;
import com.nexon.maple.model.rank.RankingGuildType;
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

    @GetMapping("/healthcheck")
    public String healthCheck() {
        return "success";
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
        if(idRes != null) {

            if (ResponseCacheManager.getInstance().getCharacterCache(request.getNickname()).getBasicResponse() == null) {
                BasicResponse basicResponse = basicApi.get(idRes.getOcid());
                ResponseCacheManager.getInstance().getCharacterCache(request.getNickname()).setBasicResponse(basicResponse);
            }
            if (ResponseCacheManager.getInstance().getCharacterCache(request.getNickname()).getPopularityResponse() == null) {
                PopularityResponse popularityResponse = popularityApi.get(idRes.getOcid());
                ResponseCacheManager.getInstance().getCharacterCache(request.getNickname()).setPopularityResponse(popularityResponse);
            }
            if (ResponseCacheManager.getInstance().getCharacterCache(request.getNickname()).getGuildIdResponse() == null ||
                    ResponseCacheManager.getInstance().getCharacterCache(request.getNickname()).getGuildBasicResponse() == null) {
                GuildIdResponse guildIdResponse = guildIdApi.get(
                        ResponseCacheManager.getInstance().getCharacterCache(request.getNickname()).getBasicResponse().getCharacterGuildName(),
                        ResponseCacheManager.getInstance().getCharacterCache(request.getNickname()).getBasicResponse().getWorldName());
                if (guildIdResponse != null) {
                    ResponseCacheManager.getInstance().getCharacterCache(request.getNickname()).setGuildIdResponse(guildIdResponse);
                    GuildBasicResponse guildBasicResponse = guildBasicApi.get(guildIdResponse.getOguildId());
                    ResponseCacheManager.getInstance().getCharacterCache(request.getNickname()).setGuildBasicResponse(guildBasicResponse);
                } else {
                    // 한번 조회했는데 없는 경우라면 다시 요청하지 않도록 캐시매니저에 빈 객체 등록
                    ResponseCacheManager.getInstance().getCharacterCache(request.getNickname()).setGuildIdResponse(new GuildIdResponse());
                    ResponseCacheManager.getInstance().getCharacterCache(request.getNickname()).setGuildBasicResponse(new GuildBasicResponse());
                }
            }
            return ResponseCacheManager.getInstance().getCharacterCache(request.getNickname());
        } else {
            return null;
        }
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
        if (idRes != null) {
            if (ResponseCacheManager.getInstance().getCharacterCache(request.getNickname()).getBasicResponse() == null) {
                BasicResponse basicResponse = basicApi.get(idRes.getOcid());
                ResponseCacheManager.getInstance().getCharacterCache(request.getNickname()).setBasicResponse(basicResponse);
            }
//            if (ResponseCacheManager.getInstance().getCharacterCache(request.getNickname()).getRankingUnionResponse() == null) {
//                RankingUnionResponse rankingUnionResponse = rankingUnionApi
//                        .get(formattedNow, ResponseCacheManager.getInstance().getCharacterCache(
//                                request.getNickname()).getBasicResponse().getWorldName(), idRes.getOcid(), 1);
//                ResponseCacheManager.getInstance().getCharacterCache(request.getNickname()).setRankingUnionResponse(rankingUnionResponse);
//            }
            if (ResponseCacheManager.getInstance().getCharacterCache(request.getNickname()).getUserUnionResponse() == null) {
                UserUnionResponse userUnionResponse = userUnionApi.get(idRes.getOcid());
                ResponseCacheManager.getInstance().getCharacterCache(request.getNickname()).setUserUnionResponse(userUnionResponse);
            }
            if (ResponseCacheManager.getInstance().getCharacterCache(request.getNickname()).getUserUnionRaiderResponse() == null) {
                UserUnionRaiderResponse userUnionRaiderResponse = userUnionRaiderApi.get(idRes.getOcid());
                ResponseCacheManager.getInstance().getCharacterCache(request.getNickname()).setUserUnionRaiderResponse(userUnionRaiderResponse);
            }
            return ResponseCacheManager.getInstance().getCharacterCache(request.getNickname());
        } else {
            return null;
        }
    }

    @GetMapping("/api/ranking/union-top")
    public RankingUnionResponse getRankUnionTop() {
        // 다른 월드 기록까지 가져오네...? 그 정보는 배제할까..?
        // 2024년 4월 19일(금) 오후 1시 적용 패치로 해결 - 유니온 랭킹 정보 조회 시 요청한 월드가 아닌 전체 월드의 랭킹이 조회되는 오류 수정

        String formattedNow = DateManager.getRankingSearchDate();
        if (ResponseCacheManager.getInstance().getRankingUnionCache(1) == null) {
            RankingUnionResponse res = rankingUnionApi.getTop(formattedNow);
            ResponseCacheManager.getInstance().addRankingUnionCache(1, res);
        }

        return ResponseCacheManager.getInstance().getRankingUnionCache(1);
    }

    @GetMapping("/api/ranking/overall-top")
    public RankingOverallResponse getRankOverallTop() {

        String formattedNow = DateManager.getRankingSearchDate();
        if (ResponseCacheManager.getInstance().getRankingOverallCache(1) == null) {
            RankingOverallResponse res = rankingOverallApi.getTop(formattedNow);
            ResponseCacheManager.getInstance().addRankingOverallCache(1, res);
        }
        return ResponseCacheManager.getInstance().getRankingOverallCache(1);
    }

    @GetMapping("/api/ranking/guild-top")
    public RankingGuildResponse getRankGuildTop(RankingGuildRequest request) {

        String formattedNow = DateManager.getRankingSearchDate();
        if (request.getRankingType() == RankingGuildType.POINT.getType()) {
            if (ResponseCacheManager.getInstance().getRankingGuildByPointCache(1) == null) {
                RankingGuildResponse res = rankingGuildApi.getTop(formattedNow, request.getRankingType());
                ResponseCacheManager.getInstance().addRankingGuildByPointCache(1, res);
            }
            return ResponseCacheManager.getInstance().getRankingGuildByPointCache(1);

        } else if (request.getRankingType() == RankingGuildType.FLAG.getType()){
            if (ResponseCacheManager.getInstance().getRankingGuildByFlagCache(1) == null) {
                RankingGuildResponse res = rankingGuildApi.getTop(formattedNow, request.getRankingType());
                ResponseCacheManager.getInstance().addRankingGuildByFlagCache(1, res);
            }
            return ResponseCacheManager.getInstance().getRankingGuildByFlagCache(1);

        } else if (request.getRankingType() == RankingGuildType.SURO.getType()){
            if (ResponseCacheManager.getInstance().getRankingGuildBySuroCache(1) == null) {
                RankingGuildResponse res = rankingGuildApi.getTop(formattedNow, request.getRankingType());
                ResponseCacheManager.getInstance().addRankingGuildBySuroCache(1, res);
            }
            return ResponseCacheManager.getInstance().getRankingGuildBySuroCache(1);
        }
        return null;
    }

    @GetMapping("/api/ranking/dojang-top")
    public RankingDojangResponse getRankDojangTop(RankingDojangRequest request) {

        String formattedNow = DateManager.getRankingSearchDate();
        if (request.getRankingType() == RankingDojangType.COMMON.getType()) {
            if (ResponseCacheManager.getInstance().getRankingDojangCommonCache(1) == null) {
                RankingDojangResponse res = rankingDojangApi.getTop(formattedNow, request.getRankingType());
                ResponseCacheManager.getInstance().addRankingDojangCommonCache(1, res);
            }
            return ResponseCacheManager.getInstance().getRankingDojangCommonCache(1);

        } else if (request.getRankingType() == RankingDojangType.MASTER.getType()){
            if (ResponseCacheManager.getInstance().getRankingDojangMasterCache(1) == null) {
                RankingDojangResponse res = rankingDojangApi.getTop(formattedNow, request.getRankingType());
                ResponseCacheManager.getInstance().addRankingDojangMasterCache(1, res);
            }
            return ResponseCacheManager.getInstance().getRankingDojangMasterCache(1);
        }
        return null;
    }

    @GetMapping("/api/ranking/theseed-top")
    public RankingTheSeedResponse getRankTheSeedTop() {

        String formattedNow = DateManager.getRankingSearchDate();
        if (ResponseCacheManager.getInstance().getRankingTheSeedCache(1) == null) {
            RankingTheSeedResponse res = rankingTheSeedApi.getTop(formattedNow);
            ResponseCacheManager.getInstance().addRankingTheSeedCache(1, res);
        }
        return ResponseCacheManager.getInstance().getRankingTheSeedCache(1);
    }

    @GetMapping("/api/ranking/achieve-top")
    public RankingAchievementResponse getRankAchievementTop() {

        String formattedNow = DateManager.getRankingSearchDate();
        if (ResponseCacheManager.getInstance().getRankingAchievementCache(1) == null) {
            RankingAchievementResponse res = rankingAchievementApi.getTop(formattedNow);
            ResponseCacheManager.getInstance().addRankingAchievementCache(1, res);
        }
        return ResponseCacheManager.getInstance().getRankingAchievementCache(1);
    }

//    @GetMapping("/api/char/id")
//    public String getCharOcid() {
//        IdResponse idres = idApi.get("마하포드");
//        logger.info("ouid = " + idres.getOcid());
//        return null;
//    }
//
//    @GetMapping("/api/char/basic")
//    public String getCharBasic() {
//        IdResponse idres = idApi.get("마하포드");
//        logger.info("ouid = " + idres.getOcid());
//        BasicResponse basicRes = basicApi.get(idres.getOcid());
//        logger.info("response tostring = " + basicRes.toString());
//        return null;
//    }
//
//    @GetMapping("/api/char/symbol")
//    public String getCharSymbol() {
//        IdResponse idres = idApi.get("마하포드");
//        logger.info("ouid = " + idres.getOcid());
//        SymbolEquipResponse symbolRes = symbolEquipApi.get(idres.getOcid(), "2023-12-22");
//        logger.info("response tostring = " + symbolRes.toString());
//        return null;
//    }
//
//    @GetMapping("/api/char/ability")
//    public String getCharAbility() {
//        IdResponse idres = idApi.get("마하포드");
//        logger.info("ouid = " + idres.getOcid());
//        AbilityResponse symbolRes = abilityApi.get(idres.getOcid(), "2023-12-23");
//        logger.info("response tostring = " + symbolRes.toString());
//        return null;
//    }
//
//    @GetMapping("/api/char/android-equip")
//    public String getCharAndroidEquip() {
//        IdResponse idres = idApi.get("마하포드");
//        logger.info("ouid = " + idres.getOcid());
//        AndroidEquipResponse symbolRes = androidEquipApi.get(idres.getOcid(), "2023-12-22");
//        logger.info("response tostring = " + symbolRes.toString());
//        return null;
//    }
//
//    @GetMapping("/api/char/beauty-equip")
//    public String getCharBeautyEquip() {
//        IdResponse idres = idApi.get("마하포드");
//        logger.info("ouid = " + idres.getOcid());
//        BeautyEquipResponse symbolRes = beautyEquipApi.get(idres.getOcid(), "2023-12-22");
//        logger.info("response tostring = " + symbolRes.toString());
//        return null;
//    }
//
//    @GetMapping("/api/char/cashitem-equip")
//    public String getCharCashItemEquip() {
//        IdResponse idres = idApi.get("마하포드");
//        logger.info("ouid = " + idres.getOcid());
//        CashItemEquipResponse symbolRes = cashItemEquipApi.get(idres.getOcid(), "2023-12-22");
//        logger.info("response tostring = " + symbolRes.toString());
//        return null;
//    }
//
//    @GetMapping("/api/char/dojang")
//    public String getCharDojang() {
//        IdResponse idres = idApi.get("마하포드");
//        logger.info("ouid = " + idres.getOcid());
//        DojangResponse symbolRes = dojangApi.get(idres.getOcid(), "2023-12-22");
//        logger.info("response tostring = " + symbolRes.toString());
//        return null;
//    }
//
//    @GetMapping("/api/char/hexamatrix")
//    public String getCharHexaMatrix() {
//        IdResponse idres = idApi.get("마하포드");
//        logger.info("ouid = " + idres.getOcid());
//        HexaMatrixResponse symbolRes = hexaMatrixApi.get(idres.getOcid(), "2023-12-22");
//        logger.info("response tostring = " + symbolRes.toString());
//        return null;
//    }
//
//    @GetMapping("/api/char/hexamatrix-stat")
//    public String getCharHexaMatrixStat() {
//        IdResponse idres = idApi.get("마하포드");
//        logger.info("ouid = " + idres.getOcid());
//        HexaMatrixStatResponse symbolRes = hexaMatrixStatApi.get(idres.getOcid(), "2023-12-22");
//        logger.info("response tostring = " + symbolRes.toString());
//        return null;
//    }
//
//    @GetMapping("/api/char/hyperstat")
//    public String getCharHyperStat() {
//        IdResponse idres = idApi.get("마하포드");
//        logger.info("ouid = " + idres.getOcid());
//        HyperStatResponse symbolRes = hyperStatApi.get(idres.getOcid(), "2023-12-22");
//        logger.info("response tostring = " + symbolRes.toString());
//        return null;
//    }
//
//    @GetMapping("/api/char/item-equip")
//    public String getCharItemEquip() {
//        IdResponse idres = idApi.get("마하포드");
//        logger.info("ouid = " + idres.getOcid());
//        ItemEquipResponse symbolRes = itemEquipApi.get(idres.getOcid(), "2023-12-22");
//        logger.info("response tostring = " + symbolRes.toString());
//        return null;
//    }
//
//    @GetMapping("/api/char/linkskill")
//    public String getCharLinkSkill() {
//        IdResponse idres = idApi.get("마하포드");
//        logger.info("ouid = " + idres.getOcid());
//        LinkSkillResponse symbolRes = linkSkillApi.get(idres.getOcid(), "2023-12-22");
//        logger.info("response tostring = " + symbolRes.toString());
//        return null;
//    }
//
//    @GetMapping("/api/char/pet-equip")
//    public String getCharPetEquip() {
//        IdResponse idres = idApi.get("마하포드");
//        logger.info("ouid = " + idres.getOcid());
//        PetEquipResponse symbolRes = petEquipApi.get(idres.getOcid(), "2023-12-22");
//        logger.info("response tostring = " + symbolRes.toString());
//        return null;
//    }
//
//    @GetMapping("/api/char/popularity")
//    public String getCharPopularity() {
//        IdResponse idres = idApi.get("마하포드");
//        logger.info("ouid = " + idres.getOcid());
//        PopularityResponse symbolRes = popularityApi.get(idres.getOcid());
//        logger.info("response tostring = " + symbolRes.toString());
//        return null;
//    }
//
//    @GetMapping("/api/char/propensity")
//    public String getCharPropensity() {
//        IdResponse idres = idApi.get("마하포드");
//        logger.info("ouid = " + idres.getOcid());
//        PropensityResponse symbolRes = propensityApi.get(idres.getOcid(), "2023-12-22");
//        logger.info("response tostring = " + symbolRes.toString());
//        return null;
//    }
//
//    @GetMapping("/api/char/seteffect")
//    public String getCharSetEffect() {
//        IdResponse idres = idApi.get("마하포드");
//        logger.info("ouid = " + idres.getOcid());
//        SetEffectResponse symbolRes = setEffectApi.get(idres.getOcid(), "2023-12-22");
//        logger.info("response tostring = " + symbolRes.toString());
//        return null;
//    }
//
//    @GetMapping("/api/char/skill")
//    public String getCharSkill() {
//        IdResponse idres = idApi.get("마하포드");
//        logger.info("ouid = " + idres.getOcid());
//        SkillResponse symbolRes = skillApi.get(idres.getOcid(), "2023-12-22", "6");
//        logger.info("response tostring = " + symbolRes.toString());
//        return null;
//    }
//
//    @GetMapping("/api/char/stat")
//    public String getCharStat() {
//        IdResponse idres = idApi.get("마하포드");
//        logger.info("ouid = " + idres.getOcid());
//        StatResponse symbolRes = statApi.get(idres.getOcid(), "2023-12-22");
//        logger.info("response tostring = " + symbolRes.toString());
//        return null;
//    }
//
//    @GetMapping("/api/char/vmatrix")
//    public String getCharVMatrix() {
//        IdResponse idres = idApi.get("마하포드");
//        logger.info("ouid = " + idres.getOcid());
//        VMatrixResponse symbolRes = vMatrixApi.get(idres.getOcid(), "2023-12-22");
//        logger.info("response tostring = " + symbolRes.toString());
//        return null;
//    }
//
//    //==================================================
//
//    @GetMapping("/api/guild/id")
//    public String getGuildInfo() {
//        GuildIdResponse res = guildIdApi.get("리제", "리부트");
//        logger.info("response tostring = " + res.toString());
//        GuildBasicResponse res2 = guildBasicApi.get(res.getOguildId());
//        logger.info("response tostring = " + res2.toString());
//        return null;
//    }
//
//    @GetMapping("/api/ranking/overall")
//    public String getRankOverall() {
//        IdResponse idres = idApi.get("마하포드");
//        logger.info("ouid = " + idres.getOcid());
////        RankingOverallResponse res = rankingOverallApi.get("2023-12-22","리부트", 0, "기사단-미하일", idres.getOcid(), 1);
//        RankingOverallResponse res = rankingOverallApi.get("2023-12-22", "리부트", 1, "기사단-미하일", idres.getOcid(), 10000);
//        logger.info("response tostring = " + res.toString());
//        return null;
//    }
//
//    @GetMapping("/api/ranking/achieve")
//    public String getRankAchieve() {
//        IdResponse idres = idApi.get("마하포드");
//        logger.info("ouid = " + idres.getOcid());
//        RankingAchievementResponse res = rankingAchievementApi.get("2023-12-22", idres.getOcid(), 1);
//        logger.info("response tostring = " + res.toString());
//        return null;
//    }
//
//    @GetMapping("/api/ranking/dojang")
//    public String getRankDojang() {
//        IdResponse idres = idApi.get("꾸부기");
//        logger.info("ouid = " + idres.getOcid());
//        RankingDojangResponse res = rankingDojangApi.get("2023-12-24", "리부트", 0, "레지스탕스-전체 전직", idres.getOcid(), 1);
//        RankingDojangResponse res2 = rankingDojangApi.get("2023-12-24", "리부트", 0, "레지스탕스-배틀메이지", idres.getOcid(), 1);
//        RankingDojangResponse res3 = rankingDojangApi.get("2023-12-24", "리부트", 1, "레지스탕스-전체 전직", idres.getOcid(), 1);
//        RankingDojangResponse res4 = rankingDojangApi.get("2023-12-24", "리부트", 1, "레지스탕스-배틀메이지", idres.getOcid(), 1);
//        //무릉 기록이 없으면 ranking 안에 빈 리스트가 return
////        logger.info("response tostring = " + res.toString());
//        return null;
//    }
//
//    @GetMapping("/api/ranking/guild")
//    public String getRankGuild() {
//        RankingGuildResponse res = rankingGuildApi.get("2023-12-22", "리부트", 2, "리제", 1);
//        logger.info("response tostring = " + res.toString());
//        return null;
//    }
//
//    @GetMapping("/api/ranking/theseed")
//    public String getRankTheSeed() {
//        IdResponse idres = idApi.get("마하포드");
//        logger.info("ouid = " + idres.getOcid());
//        RankingTheSeedResponse res = rankingTheSeedApi.get("2023-12-22", "리부트", idres.getOcid(), 1);
//        //무릉 기록이 없으면 ranking 안에 빈 리스트가 return
//        logger.info("response tostring = " + res.toString());
//        return null;
//    }
//
//
//    //===============================================
//    @GetMapping("/api/user/union")
//    public String getUserUnion() {
//        IdResponse idres = idApi.get("마하포드");
//        logger.info("ouid = " + idres.getOcid());
//        UserUnionResponse res = userUnionApi.get(idres.getOcid());
//        logger.info("response tostring = " + res.toString());
//        return null;
//    }
//
//    @GetMapping("/api/user/union-raider")
//    public String getUserUnionRaider() {
//        IdResponse idres = idApi.get("마하포드");
//        logger.info("ouid = " + idres.getOcid());
//        UserUnionRaiderResponse res = userUnionRaiderApi.get(idres.getOcid());
//        logger.info("response tostring = " + res.toString());
//        return null;
//    }
}
