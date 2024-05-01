package com.nexon.maple.cache;

import com.nexon.maple.controller.MapleController;
import com.nexon.maple.model.character.overall.CharacterOverallResponse;
import com.nexon.maple.openapi.client.ranking.response.*;
import lombok.Getter;
import net.jodah.expiringmap.ExpirationPolicy;
import net.jodah.expiringmap.ExpiringMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;

@Getter
public class ResponseCacheManager {
    Logger logger = LoggerFactory.getLogger(ResponseCacheManager.class);
    private final Map<String, CharacterOverallResponse> characterCacheMap =
            ExpiringMap.builder()
                    .expirationPolicy(ExpirationPolicy.CREATED)
                    .expiration(3, TimeUnit.MINUTES)
                    .expirationListener((key, value) -> logger.info("--- character key expired: " + key))
                    .build();

    private final Map<Integer, RankingUnionResponse> rankingUnionCacheMap =
            new ConcurrentHashMap<Integer, RankingUnionResponse>();  // Map<페이지번호, 응답값>
    private final Map<Integer, RankingOverallResponse> rankingOverallCacheMap =
            new ConcurrentHashMap<Integer, RankingOverallResponse>();  // Map<페이지번호, 응답값>
    private final Map<Integer, RankingGuildResponse> rankingGuildByPointCacheMap =
            new ConcurrentHashMap<Integer, RankingGuildResponse>();  // Map<페이지번호, 응답값>
    private final Map<Integer, RankingGuildResponse> rankingGuildByFlagCacheMap =
            new ConcurrentHashMap<Integer, RankingGuildResponse>();  // Map<페이지번호, 응답값>
    private final Map<Integer, RankingGuildResponse> rankingGuildBySuroCacheMap =
            new ConcurrentHashMap<Integer, RankingGuildResponse>();  // Map<페이지번호, 응답값>
    // 무릉 일반
    private final Map<Integer, RankingDojangResponse> rankingDojangCommonCacheMap =
            new ConcurrentHashMap<Integer, RankingDojangResponse>();  // Map<페이지번호, 응답값>
    // 무릉 통달
    private final Map<Integer, RankingDojangResponse> rankingDojangMasterCacheMap =
            new ConcurrentHashMap<Integer, RankingDojangResponse>();  // Map<페이지번호, 응답값>
    private final Map<Integer, RankingTheSeedResponse> rankingTheSeedCacheMap =
            new ConcurrentHashMap<Integer, RankingTheSeedResponse>();  // Map<페이지번호, 응답값>
    private final Map<Integer, RankingAchievementResponse> rankingAchievementCacheMap =
            new ConcurrentHashMap<Integer, RankingAchievementResponse>();  // Map<페이지번호, 응답값>


    private ResponseCacheManager() {
    }

    public static ResponseCacheManager getInstance() {
        return LazyHolder.INSTANCE;
    }

    private static class LazyHolder {
        private static final ResponseCacheManager INSTANCE = new ResponseCacheManager();
    }

    // 캐릭터 정보
    public CharacterOverallResponse getCharacterCache(String nickName) {
        return this.characterCacheMap.get(nickName);
    }

    public void addCharacterCache(String nickName, CharacterOverallResponse response) {
        this.characterCacheMap.put(nickName, response);
    }

    public void clearCharacterCacheOne(String nickName) {
        this.characterCacheMap.remove(nickName);
    }

    public void clearCharacterCacheAll() {
        this.characterCacheMap.clear();
    }

    // 유니온 랭킹 정보
    public RankingUnionResponse getRankingUnionCache(int pageNum) {
        return this.rankingUnionCacheMap.get(pageNum);
    }
    public void addRankingUnionCache(int pageNum, RankingUnionResponse response) {
        this.rankingUnionCacheMap.put(pageNum, response);
    }
    public void clearRankingUnionCacheAll() { this.rankingUnionCacheMap.clear(); }

    // 종합 랭킹 정보
    public RankingOverallResponse getRankingOverallCache(int pageNum) {
        return this.rankingOverallCacheMap.get(pageNum);
    }
    public void addRankingOverallCache(int pageNum, RankingOverallResponse response) {
        this.rankingOverallCacheMap.put(pageNum, response);
    }
    public void clearRankingOverallCacheAll() { this.rankingOverallCacheMap.clear(); }

    // 길드 랭킹 정보 - 명성치
    public RankingGuildResponse getRankingGuildByPointCache(int pageNum) {
        return this.rankingGuildByPointCacheMap.get(pageNum);
    }
    public void addRankingGuildByPointCache(int pageNum, RankingGuildResponse response) {
        this.rankingGuildByPointCacheMap.put(pageNum, response);
    }
    public void clearRankingGuildByPointCacheAll() { this.rankingGuildByPointCacheMap.clear(); }

    // 길드 랭킹 정보 - 플래그
    public RankingGuildResponse getRankingGuildByFlagCache(int pageNum) {
        return this.rankingGuildBySuroCacheMap.get(pageNum);
    }
    public void addRankingGuildByFlagCache(int pageNum, RankingGuildResponse response) {
        this.rankingGuildByFlagCacheMap.put(pageNum, response);
    }
    public void clearRankingGuildByFlagCacheAll() { this.rankingGuildByFlagCacheMap.clear(); }

    // 길드 랭킹 정보 - 수로
    public RankingGuildResponse getRankingGuildBySuroCache(int pageNum) {
        return this.rankingGuildBySuroCacheMap.get(pageNum);
    }
    public void addRankingGuildBySuroCache(int pageNum, RankingGuildResponse response) {
        this.rankingGuildBySuroCacheMap.put(pageNum, response);
    }
    public void clearRankingGuildBySuroCacheAll() { this.rankingGuildBySuroCacheMap.clear(); }

    // 무릉 랭킹 정보 - 일반
    public RankingDojangResponse getRankingDojangCommonCache(int pageNum) {
        return this.rankingDojangCommonCacheMap.get(pageNum);
    }
    public void addRankingDojangCommonCache(int pageNum, RankingDojangResponse response) {
        this.rankingDojangCommonCacheMap.put(pageNum, response);
    }
    public void clearRankingDojangCommonCacheAll() { this.rankingDojangCommonCacheMap.clear(); }

    // 무릉 랭킹 정보 - 통달
    public RankingDojangResponse getRankingDojangMasterCache(int pageNum) {
        return this.rankingDojangMasterCacheMap.get(pageNum);
    }
    public void addRankingDojangMasterCache(int pageNum, RankingDojangResponse response) {
        this.rankingDojangMasterCacheMap.put(pageNum, response);
    }
    public void clearRankingDojangMasterCacheAll() { this.rankingDojangMasterCacheMap.clear(); }

    // 더시드 랭킹 정보
    public RankingTheSeedResponse getRankingTheSeedCache(int pageNum) {
        return this.rankingTheSeedCacheMap.get(pageNum);
    }
    public void addRankingTheSeedCache(int pageNum, RankingTheSeedResponse response) {
        this.rankingTheSeedCacheMap.put(pageNum, response);
    }
    public void clearRankingTheSeedCacheAll() { this.rankingTheSeedCacheMap.clear(); }

    // 업적 랭킹 정보
    public RankingAchievementResponse getRankingAchievementCache(int pageNum) {
        return this.rankingAchievementCacheMap.get(pageNum);
    }
    public void addRankingAchievementCache(int pageNum, RankingAchievementResponse response) {
        this.rankingAchievementCacheMap.put(pageNum, response);
    }
    public void clearRankingAchievementCacheAll() { this.rankingAchievementCacheMap.clear(); }

    public void clearRankingCacheAll() {
        clearRankingOverallCacheAll();
        clearRankingAchievementCacheAll();
        clearRankingDojangCommonCacheAll();
        clearRankingDojangMasterCacheAll();
        clearRankingUnionCacheAll();
        clearRankingTheSeedCacheAll();
        clearRankingGuildByPointCacheAll();
        clearRankingGuildBySuroCacheAll();
        clearRankingGuildByFlagCacheAll();
    }
}
