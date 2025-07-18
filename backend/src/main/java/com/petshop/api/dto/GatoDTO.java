package com.petshop.api.dto;

public class GatoDTO extends AnimalDTO {
    private Boolean castrado;
    
    @Override
    public String getTipoAnimal() {
        return "GATO";
    }
    
    public Boolean getCastrado() {
        return castrado;
    }
    
    public void setCastrado(Boolean castrado) {
        this.castrado = castrado;
    }
}
