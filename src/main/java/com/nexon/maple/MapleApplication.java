package com.nexon.maple;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@ComponentScan
@EnableScheduling
@ConfigurationPropertiesScan
public class MapleApplication {

	public static void main(String[] args) {
		SpringApplication.run(MapleApplication.class, args);
	}

}
