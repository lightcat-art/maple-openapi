package com.nexon.maple.openapi.client.union.response.raider;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class UnionBlock {
    private String blockType;
    private String blockClass;
    private String blockLevel;
    private BlockControlPoint blockControlPoint;
    private List<BlockPosition> blockPosition;

}
