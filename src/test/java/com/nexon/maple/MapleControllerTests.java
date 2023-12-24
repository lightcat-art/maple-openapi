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
    public void basicTest() throws Exception {
        mvc.perform(get("/api/char/basic"))
                .andExpect(status().isOk())//200 상태
                .andExpect(content().string(""));//응답 본문의 내용을 검증
    }

    @Test
    public void symbolTest() throws Exception {
        mvc.perform(get("/api/char/symbol"))
                .andExpect(status().isOk())//200 상태
                .andExpect(content().string(""));//응답 본문의 내용을 검증
    }

}
