package com.nexon.maple.openapi.client.union.response.raider;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
@JsonIgnoreProperties(ignoreUnknown = true)
public class UnionBlock {
    private String blockType;
    private String blockClass;
    private String blockLevel;
    private BlockControlPoint blockControlPoint;
    private List<BlockPosition> blockPosition;

}
