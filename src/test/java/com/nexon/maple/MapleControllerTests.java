package com.nexon.maple;


import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class MapleControllerTests {
    @Autowired
    private MockMvc mvc;

    @Test
    public void getCharBasic() throws Exception {
        mvc.perform(get("/api/char/basic"))
                .andExpect(status().isOk())//200 상태
                .andExpect(content().string(""));//응답 본문의 내용을 검증
    }

    @Test
    public void getCharSymbol() throws Exception {
        mvc.perform(get("/api/char/symbol"))
                .andExpect(status().isOk())//200 상태
                .andExpect(content().string(""));//응답 본문의 내용을 검증
    }

    @Test
    public void getCharAbility() throws Exception {
        mvc.perform(get("/api/char/ability"))
                .andExpect(status().isOk())//200 상태
                .andExpect(content().string(""));//응답 본문의 내용을 검증
    }

    @Test
    public void getCharAndroidEquip() throws Exception {
        mvc.perform(get("/api/char/android-equip"))
                .andExpect(status().isOk())//200 상태
                .andExpect(content().string(""));//응답 본문의 내용을 검증
    }
    @Test
    public void getCharBeautyEquip() throws Exception {
        mvc.perform(get("/api/char/beauty-equip"))
                .andExpect(status().isOk())//200 상태
                .andExpect(content().string(""));//응답 본문의 내용을 검증
    }

    @Test
    public void getCharCashItemEquip() throws Exception {
        mvc.perform(get("/api/char/cashitem-equip"))
                .andExpect(status().isOk())//200 상태
                .andExpect(content().string(""));//응답 본문의 내용을 검증
    }
    @Test
    public void getCharDojang() throws Exception {
        mvc.perform(get("/api/char/dojang"))
                .andExpect(status().isOk())//200 상태
                .andExpect(content().string(""));//응답 본문의 내용을 검증
    }
    @Test
    public void getCharHexaMatrix() throws Exception {
        mvc.perform(get("/api/char/hexamatrix"))
                .andExpect(status().isOk())//200 상태
                .andExpect(content().string(""));//응답 본문의 내용을 검증
    }
    @Test
    public void getCharHexaMatrixStat() throws Exception {
        mvc.perform(get("/api/char/hexamatrix-stat"))
                .andExpect(status().isOk())//200 상태
                .andExpect(content().string(""));//응답 본문의 내용을 검증
    }
    @Test
    public void getCharHyperStat() throws Exception {
        mvc.perform(get("/api/char/hyperstat"))
                .andExpect(status().isOk())//200 상태
                .andExpect(content().string(""));//응답 본문의 내용을 검증
    }
    @Test
    public void getCharItemEquip() throws Exception {
        mvc.perform(get("/api/char/item-equip"))
                .andExpect(status().isOk())//200 상태
                .andExpect(content().string(""));//응답 본문의 내용을 검증
    }
    @Test
    public void getCharLinkSkill() throws Exception {
        mvc.perform(get("/api/char/linkskill"))
                .andExpect(status().isOk())//200 상태
                .andExpect(content().string(""));//응답 본문의 내용을 검증
    }
    @Test
    public void getCharPetEquip() throws Exception {
        mvc.perform(get("/api/char/pet-equip"))
                .andExpect(status().isOk())//200 상태
                .andExpect(content().string(""));//응답 본문의 내용을 검증
    }
    @Test
    public void getCharPopularity() throws Exception {
        mvc.perform(get("/api/char/popularity"))
                .andExpect(status().isOk())//200 상태
                .andExpect(content().string(""));//응답 본문의 내용을 검증
    }
    @Test
    public void getCharPropensity() throws Exception {
        mvc.perform(get("/api/char/propensity"))
                .andExpect(status().isOk())//200 상태
                .andExpect(content().string(""));//응답 본문의 내용을 검증
    }
    @Test
    public void getCharSetEffect() throws Exception {
        mvc.perform(get("/api/char/seteffect"))
                .andExpect(status().isOk())//200 상태
                .andExpect(content().string(""));//응답 본문의 내용을 검증
    }
    @Test
    public void getCharSkill() throws Exception {
        mvc.perform(get("/api/char/skill"))
                .andExpect(status().isOk())//200 상태
                .andExpect(content().string(""));//응답 본문의 내용을 검증
    }
    @Test
    public void getCharStat() throws Exception {
        mvc.perform(get("/api/char/stat"))
                .andExpect(status().isOk())//200 상태
                .andExpect(content().string(""));//응답 본문의 내용을 검증
    }
    @Test
    public void getCharVMatrix() throws Exception {
        mvc.perform(get("/api/char/vmatrix"))
                .andExpect(status().isOk())//200 상태
                .andExpect(content().string(""));//응답 본문의 내용을 검증
    }

    //==========================================

    @Test
    public void getGuildInfo() throws Exception {
        mvc.perform(get("/api/guild/id"))
                .andExpect(status().isOk())//200 상태
                .andExpect(content().string(""));//응답 본문의 내용을 검증
    }

    //=============================================
    @Test
    public void getRankOverall() throws Exception {
        mvc.perform(get("/api/ranking/overall"))
                .andExpect(status().isOk())//200 상태
                .andExpect(content().string(""));//응답 본문의 내용을 검증
    }
    @Test
    public void getRankAchieve() throws Exception {
        mvc.perform(get("/api/ranking/achieve"))
                .andExpect(status().isOk())//200 상태
                .andExpect(content().string(""));//응답 본문의 내용을 검증
    }

    @Test
    public void getRankDojang() throws Exception {
        mvc.perform(get("/api/ranking/dojang"))
                .andExpect(status().isOk())//200 상태
                .andExpect(content().string(""));//응답 본문의 내용을 검증
    }

    @Test
    public void getRankGuild() throws Exception {
        mvc.perform(get("/api/ranking/guild"))
                .andExpect(status().isOk())//200 상태
                .andExpect(content().string(""));//응답 본문의 내용을 검증
    }

    @Test
    public void getRankTheSeed() throws Exception {
        mvc.perform(get("/api/ranking/theseed"))
                .andExpect(status().isOk())//200 상태
                .andExpect(content().string(""));//응답 본문의 내용을 검증
    }

    @Test
    public void getRankUnion() throws Exception {
        mvc.perform(get("/api/ranking/union"))
                .andExpect(status().isOk())//200 상태
                .andExpect(content().string(""));//응답 본문의 내용을 검증
    }

    //=====================================

    @Test
    public void getUserUnion() throws Exception {
        mvc.perform(get("/api/user/union"))
                .andExpect(status().isOk())//200 상태
                .andExpect(content().string(""));//응답 본문의 내용을 검증
    }

    @Test
    public void getUserUnionRaider() throws Exception {
        mvc.perform(get("/api/user/union-raider"))
                .andExpect(status().isOk())//200 상태
                .andExpect(content().string(""));//응답 본문의 내용을 검증
    }
}
