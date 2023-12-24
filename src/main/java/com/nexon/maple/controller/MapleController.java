package com.nexon.maple.controller;


import com.nexon.maple.model.character.overall.CharacterOverallRequest;
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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
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
    public String getCharOverall(CharacterOverallRequest request) {
        // ocid 가져오기
        IdResponse idres = idApi.get(request.getNickname());

        //
        return null;
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
        RankingOverallResponse res = rankingOverallApi.get("2023-12-22","리부트", 0, "기사단-미하일", idres.getOcid(), 1);
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
        IdResponse idres = idApi.get("마하포드");
        logger.info("ouid = " + idres.getOcid());
        RankingDojangResponse res = rankingDojangApi.get("2023-12-22","리부트", 1, "기사단-미하일", idres.getOcid(), 1);
        //무릉 기록이 없으면 ranking 안에 빈 리스트가 return
        logger.info("response tostring = " + res.toString());
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
