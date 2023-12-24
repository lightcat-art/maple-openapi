package com.nexon.maple.controller;


import com.nexon.maple.api.character.*;
import com.nexon.maple.api.character.response.*;
import com.nexon.maple.api.guild.GuildBasicApi;
import com.nexon.maple.api.guild.GuildIdApi;
import com.nexon.maple.api.ranking.*;
import com.nexon.maple.api.ranking.response.RankingUnionResponse;
import com.nexon.maple.api.user.union.UserUnionApi;
import com.nexon.maple.api.user.union.UserUnionRaiderApi;
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
    GuildIdApi guildApi;

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
        BasicResponse basicRes = basicApi.get(idres.getOcid(), "2023-12-22");
        logger.info("response tostring = "+basicRes.toString());
        return null;
    }

    @GetMapping("/api/char/symbol")
    public String getCharSymbol() {
        IdResponse idres = idApi.get("마하포드");
        logger.info("ouid = " + idres.getOcid());
        SymbolEquipResponse symbolRes = symbolEquipApi.get(idres.getOcid(), "2023-12-22");
        logger.info("response tostring = "+symbolRes.toString());
        return null;
    }

    @GetMapping("/api/char/ability")
    public String getCharAbility() {
        IdResponse idres = idApi.get("마하포드");
        logger.info("ouid = " + idres.getOcid());
        AbilityResponse symbolRes = abilityApi.get(idres.getOcid(), "2023-12-23");
        logger.info("response tostring = "+symbolRes.toString());
        return null;
    }
    @GetMapping("/api/char/android-equip")
    public String getCharAndroidEquip() {
        IdResponse idres = idApi.get("마하포드");
        logger.info("ouid = " + idres.getOcid());
        AndroidEquipResponse symbolRes = androidEquipApi.get(idres.getOcid(), "2023-12-22");
        logger.info("response tostring = "+symbolRes.toString());
        return null;
    }
    @GetMapping("/api/char/beauty-equip")
    public String getCharBeautyEquip() {
        IdResponse idres = idApi.get("마하포드");
        logger.info("ouid = " + idres.getOcid());
        BeautyEquipResponse symbolRes = beautyEquipApi.get(idres.getOcid(), "2023-12-22");
        logger.info("response tostring = "+symbolRes.toString());
        return null;
    }
    @GetMapping("/api/char/cashitem-equip")
    public String getCharCashItemEquip() {
        IdResponse idres = idApi.get("마하포드");
        logger.info("ouid = " + idres.getOcid());
        CashItemEquipResponse symbolRes = cashItemEquipApi.get(idres.getOcid(), "2023-12-22");
        logger.info("response tostring = "+symbolRes.toString());
        return null;
    }
    @GetMapping("/api/char/dojang")
    public String getCharDojang() {
        IdResponse idres = idApi.get("마하포드");
        logger.info("ouid = " + idres.getOcid());
        DojangResponse symbolRes = dojangApi.get(idres.getOcid(), "2023-12-22");
        logger.info("response tostring = "+symbolRes.toString());
        return null;
    }
    @GetMapping("/api/char/hexamatrix")
    public String getCharHexaMatrix() {
        IdResponse idres = idApi.get("마하포드");
        logger.info("ouid = " + idres.getOcid());
        HexaMatrixResponse symbolRes = hexaMatrixApi.get(idres.getOcid(), "2023-12-22");
        logger.info("response tostring = "+symbolRes.toString());
        return null;
    }
    @GetMapping("/api/char/hexamatrix-stat")
    public String getCharHexaMatrixStat() {
        IdResponse idres = idApi.get("마하포드");
        logger.info("ouid = " + idres.getOcid());
        HexaMatrixStatResponse symbolRes = hexaMatrixStatApi.get(idres.getOcid(), "2023-12-22");
        logger.info("response tostring = "+symbolRes.toString());
        return null;
    }
    @GetMapping("/api/char/hyperstat")
    public String getCharHyperStat() {
        IdResponse idres = idApi.get("마하포드");
        logger.info("ouid = " + idres.getOcid());
        HyperStatResponse symbolRes = hyperStatApi.get(idres.getOcid(), "2023-12-22");
        logger.info("response tostring = "+symbolRes.toString());
        return null;
    }
    @GetMapping("/api/char/item-equip")
    public String getCharItemEquip() {
        IdResponse idres = idApi.get("마하포드");
        logger.info("ouid = " + idres.getOcid());
        ItemEquipResponse symbolRes = itemEquipApi.get(idres.getOcid(), "2023-12-22");
        logger.info("response tostring = "+symbolRes.toString());
        return null;
    }
    @GetMapping("/api/char/linkskill")
    public String getCharLinkSkill() {
        IdResponse idres = idApi.get("마하포드");
        logger.info("ouid = " + idres.getOcid());
        LinkSkillResponse symbolRes = linkSkillApi.get(idres.getOcid(), "2023-12-22");
        logger.info("response tostring = "+symbolRes.toString());
        return null;
    }
    @GetMapping("/api/char/pet-equip")
    public String getCharPetEquip() {
        IdResponse idres = idApi.get("마하포드");
        logger.info("ouid = " + idres.getOcid());
        PetEquipResponse symbolRes = petEquipApi.get(idres.getOcid(), "2023-12-22");
        logger.info("response tostring = "+symbolRes.toString());
        return null;
    }
    @GetMapping("/api/char/popularity")
    public String getCharPopularity() {
        IdResponse idres = idApi.get("마하포드");
        logger.info("ouid = " + idres.getOcid());
        PopularityResponse symbolRes = popularityApi.get(idres.getOcid(), "2023-12-22");
        logger.info("response tostring = "+symbolRes.toString());
        return null;
    }
    @GetMapping("/api/char/propensity")
    public String getCharPropensity() {
        IdResponse idres = idApi.get("마하포드");
        logger.info("ouid = " + idres.getOcid());
        PropensityResponse symbolRes = propensityApi.get(idres.getOcid(), "2023-12-22");
        logger.info("response tostring = "+symbolRes.toString());
        return null;
    }
    @GetMapping("/api/char/seteffect")
    public String getCharSetEffect() {
        IdResponse idres = idApi.get("마하포드");
        logger.info("ouid = " + idres.getOcid());
        SetEffectResponse symbolRes = setEffectApi.get(idres.getOcid(), "2023-12-22");
        logger.info("response tostring = "+symbolRes.toString());
        return null;
    }
    @GetMapping("/api/char/skill")
    public String getCharSkill() {
        IdResponse idres = idApi.get("마하포드");
        logger.info("ouid = " + idres.getOcid());
        SkillResponse symbolRes = skillApi.get(idres.getOcid(), "2023-12-22", "6");
        logger.info("response tostring = "+symbolRes.toString());
        return null;
    }
    @GetMapping("/api/char/stat")
    public String getCharStat() {
        IdResponse idres = idApi.get("마하포드");
        logger.info("ouid = " + idres.getOcid());
        StatResponse symbolRes = statApi.get(idres.getOcid(), "2023-12-22");
        logger.info("response tostring = "+symbolRes.toString());
        return null;
    }
    @GetMapping("/api/char/vmatrix")
    public String getCharVMatrix() {
        IdResponse idres = idApi.get("마하포드");
        logger.info("ouid = " + idres.getOcid());
        VMatrixResponse symbolRes = vMatrixApi.get(idres.getOcid(), "2023-12-22");
        logger.info("response tostring = "+symbolRes.toString());
        return null;
    }

}
