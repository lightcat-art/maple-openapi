package com.nexon.maple.model.character.overall;


import com.nexon.maple.openapi.client.character.response.*;
import com.nexon.maple.openapi.client.guild.response.GuildBasicResponse;
import com.nexon.maple.openapi.client.guild.response.GuildIdResponse;
import com.nexon.maple.openapi.client.ranking.RankingTheSeedApi;
import com.nexon.maple.openapi.client.ranking.response.*;
import com.nexon.maple.openapi.client.union.response.UserUnionRaiderResponse;
import com.nexon.maple.openapi.client.union.response.UserUnionResponse;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class CharacterOverallResponse {
    private IdResponse idResponse;
    private BasicResponse basicResponse;
    private PopularityResponse popularityResponse;
    private StatResponse statResponse;
    private HyperStatResponse hyperStatResponse;
    private PropensityResponse propensityResponse;
    private AbilityResponse abilityResponse;
    private ItemEquipResponse itemEquipResponse;
    private CashItemEquipResponse cashItemEquipResponse;
    private SymbolEquipResponse symbolEquipResponse;
    private SetEffectResponse setEffectResponse;
    private BeautyEquipResponse beautyEquipResponse;
    private AndroidEquipResponse androidEquipResponse;
    private PetEquipResponse petEquipResponse;
    private SkillResponse skillResponseHp; //하이퍼 패시브 스킬
    private SkillResponse skillResponseHa; //하이퍼 액티브 스킬
    private SkillResponse skillResponse5;
    private SkillResponse skillResponse6;
    private LinkSkillResponse linkSkillResponse;
    private VMatrixResponse vMatrixResponse;
    private HexaMatrixResponse hexaMatrixResponse;
    private HexaMatrixStatResponse hexaMatrixStatResponse;
    private DojangResponse dojangResponse;
    private RankingUnionResponse rankingUnionResponse;
    private RankingOverallResponse rankingOverallMyClassResponse;
    private RankingOverallResponse rankingOverallWholeClassResponse;
    private RankingDojangResponse rankingDojangMyClassResponse;
    private RankingDojangResponse rankingDojangWholeClassResponse;
    private RankingTheSeedResponse rankingTheSeedResponse;
    private RankingAchievementResponse rankingAchievementResponse;
    private UserUnionResponse userUnionResponse;
    private UserUnionRaiderResponse userUnionRaiderResponse;
    private GuildBasicResponse guildBasicResponse;
    private GuildIdResponse guildIdResponse;


}


