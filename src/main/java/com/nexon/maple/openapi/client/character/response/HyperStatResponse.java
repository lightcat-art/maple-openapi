package com.nexon.maple.openapi.client.character.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.nexon.maple.openapi.client.character.response.hyperstat.HyperStatPreset1;
import com.nexon.maple.openapi.client.character.response.hyperstat.HyperStatPreset2;
import com.nexon.maple.openapi.client.character.response.hyperstat.HyperStatPreset3;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class HyperStatResponse {
    private String date;
    private String characterClass;
    private String usePresetNo;
    private int useAvailableHyperStat;
    @JsonProperty("hyper_stat_preset_1")
    private List<HyperStatPreset1> hyperStatPreset1;
    @JsonProperty("hyper_stat_preset_1_remain_point")
    private int hyperStatPreset1RemainPoint;
    @JsonProperty("hyper_stat_preset_2")
    private List<HyperStatPreset2> hyperStatPreset2;
    @JsonProperty("hyper_stat_preset_2_remain_point")
    private int hyperStatPreset2RemainPoint;
    @JsonProperty("hyper_stat_preset_3")
    private List<HyperStatPreset3> hyperStatPreset3;
    @JsonProperty("hyper_stat_preset_3_remain_point")
    private int hyperStatPreset3RemainPoint;
}
