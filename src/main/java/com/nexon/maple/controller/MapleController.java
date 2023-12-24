package com.nexon.maple.controller;


import com.nexon.maple.api.character.BasicApi;
import com.nexon.maple.api.character.IdApi;
import com.nexon.maple.api.character.SymbolEquipApi;
import com.nexon.maple.api.character.response.BasicResponse;
import com.nexon.maple.api.character.response.IdResponse;
import com.nexon.maple.api.character.response.SymbolEquipResponse;
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
    SymbolEquipApi symbolEquipApi;

    @GetMapping("/api/char/id")
    public String getCharacterOcid() {
        IdResponse idres = idApi.get("마하포드");
        logger.info("ouid = " + idres.getOcid());
        return null;
    }

    @GetMapping("/api/char/basic")
    public String getCharacterBasic() {
        IdResponse idres = idApi.get("마하포드");
        logger.info("ouid = " + idres.getOcid());
        BasicResponse basicRes = basicApi.get(idres.getOcid(), "2023-12-22");
        logger.info("basic response tostring = "+basicRes.toString());
        return null;
    }

    @GetMapping("/api/char/symbol")
    public String getCharacterSymbol() {
        IdResponse idres = idApi.get("마하포드");
        logger.info("ouid = " + idres.getOcid());
        SymbolEquipResponse symbolRes = symbolEquipApi.get(idres.getOcid(), "2023-12-22");
        logger.info("symbol response tostring = "+symbolRes.toString());
        return null;
    }

}
