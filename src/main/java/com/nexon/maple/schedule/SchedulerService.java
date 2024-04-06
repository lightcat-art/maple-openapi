package com.nexon.maple.schedule;

import com.nexon.maple.cache.ResponseCacheManager;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SchedulerService {
    @Scheduled(cron = "2 0 1 * * *")
    public void cacheRemove() {
        ResponseCacheManager.getInstance().clearCharacterCacheAll();
    }

}