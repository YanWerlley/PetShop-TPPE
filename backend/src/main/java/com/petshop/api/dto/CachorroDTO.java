package com.petshop.api.dto;

public class CachorroDTO extends AnimalDTO {
    private String porte;
    
    @Override
    public String getTipoAnimal() {
        return "CACHORRO";
    }
    
    public String getPorte() {
        return porte;
    }
    
    public void setPorte(String porte) {
        this.porte = porte;
    }
}
