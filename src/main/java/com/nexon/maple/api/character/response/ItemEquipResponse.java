package com.nexon.maple.api.character.response;

import com.nexon.maple.api.character.response.itemequip.DragonEquipment;
import com.nexon.maple.api.character.response.itemequip.ItemEquipment;
import com.nexon.maple.api.character.response.itemequip.MechanicEquipment;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ItemEquipResponse {
    private String date;
    private String characterGender;
    private String characterClass;
    private ItemEquipment itemEquipment;
    private DragonEquipment dragonEquipment;
    private MechanicEquipment mechanicEquipment;
}
