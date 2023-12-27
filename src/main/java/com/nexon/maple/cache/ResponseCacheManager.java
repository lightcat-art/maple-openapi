package com.nexon.maple.cache;

import com.nexon.maple.model.character.overall.CharacterOverallResponse;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class ResponseCacheManager {

    private Map<String, CharacterOverallResponse> characterCacheMap = new ConcurrentHashMap<String, CharacterOverallResponse>();

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

    public CharacterOverallResponse getCharacterCache(String ocid) {
        return this.characterCacheMap.get(ocid);
    }

    public void addCharacterCache(String ocid, CharacterOverallResponse response) {
        this.characterCacheMap.put(ocid, response);
    }

    public void delCharacterCache(String ocid) {
        this.characterCacheMap.remove(ocid);
    }

    public void clearCharacterCache() {
        this.characterCacheMap.clear();
    }

}
