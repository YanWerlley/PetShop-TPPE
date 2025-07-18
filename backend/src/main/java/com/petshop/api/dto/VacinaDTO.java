package com.petshop.api.dto;

import com.petshop.api.modelo.Vacina;
import com.petshop.api.modelo.Vacina.TipoAnimal;

import java.time.LocalDate;

public class VacinaDTO {
    private Long id;
    private String nome;
    private TipoAnimal tipoAnimal;
    private LocalDate dataValidade;

    // Construtores
    public VacinaDTO() {
    }

    public VacinaDTO(Vacina vacina) {
        this.id = vacina.getId();
        this.nome = vacina.getNome();
        this.tipoAnimal = vacina.getTipoAnimal();
        this.dataValidade = vacina.getDataValidade();
    }

    // Converter DTO para entidade
    public Vacina toEntity() {
        Vacina vacina = new Vacina();
        vacina.setId(this.id);
        vacina.setNome(this.nome);
        vacina.setTipoAnimal(this.tipoAnimal);
        vacina.setDataValidade(this.dataValidade);
        
        return vacina;
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public TipoAnimal getTipoAnimal() {
        return tipoAnimal;
    }

    public void setTipoAnimal(TipoAnimal tipoAnimal) {
        this.tipoAnimal = tipoAnimal;
    }

    public LocalDate getDataValidade() {
        return dataValidade;
    }

    public void setDataValidade(LocalDate dataValidade) {
        this.dataValidade = dataValidade;
    }
}
