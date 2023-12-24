package com.nexon.maple.api.character.response;

import com.nexon.maple.api.character.response.itemequip.DragonEquipment;
import com.nexon.maple.api.character.response.itemequip.ItemEquipment;
import com.nexon.maple.api.character.response.itemequip.MechanicEquipment;
import com.nexon.maple.api.character.response.itemequip.Title;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class ItemEquipResponse {
    private String date;
    private String characterGender;
    private String characterClass;
    private List<ItemEquipment> itemEquipment;
    private List<DragonEquipment> dragonEquipment;
    private List<MechanicEquipment> mechanicEquipment;
    private Title title;
}
