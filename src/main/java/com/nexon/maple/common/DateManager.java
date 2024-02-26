package com.nexon.maple.common;


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

public class DateManager {
    private static final LocalTime midNight = LocalTime.of(0, 0, 0);
    private static final LocalTime oneAM = LocalTime.of(1,0,1);
    public static String getSearchDate() {
        LocalDateTime now = LocalDateTime.now();
        LocalDate nowDate = null;
        LocalTime nowTime = LocalTime.of(now.getHour(), now.getMinute(), now.getSecond());
        // 12시 ~ 새벽 1시 사이
        if (nowTime.compareTo(midNight) >= 0 && nowTime.compareTo(oneAM) < 0) {
            nowDate = LocalDate.from(now.minusDays(2));
        } else {
            nowDate = LocalDate.from(now.minusDays(1));
        }
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        return nowDate.format(formatter);
    }

    // 갱신시간인 새벽1시가 되었는지 아닌지 체크
    public static boolean isRenewingTime() {
        LocalDateTime now = LocalDateTime.now();
        LocalTime nowTime = LocalTime.of(now.getHour(), now.getMinute(), now.getSecond());
        return nowTime.compareTo(oneAM) >= 0;
    }
}
