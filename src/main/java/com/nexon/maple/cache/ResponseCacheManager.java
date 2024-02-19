package com.nexon.maple.cache;

import com.nexon.maple.model.character.overall.CharacterOverallResponse;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class ResponseCacheManager {

    private final Map<String, CharacterOverallResponse> characterCacheMap = new ConcurrentHashMap<String, CharacterOverallResponse>();

    private ResponseCacheManager() {
    }

    public static ResponseCacheManager getInstance() {
        return LazyHolder.INSTANCE;
    }

    private static class LazyHolder {
        private static final ResponseCacheManager INSTANCE = new ResponseCacheManager();
    }

    public Map<String, CharacterOverallResponse> getCharacterCacheMap() {
        return this.characterCacheMap;
    }

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

}
