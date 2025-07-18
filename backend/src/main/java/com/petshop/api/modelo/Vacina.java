package com.petshop.api.modelo;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Vacina {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String nome;
    
    // Tipo de animal: GATO, CACHORRO, AMBOS
    private TipoAnimal tipoAnimal;
    
    private LocalDate dataValidade;

    // Enumeração para tipo de animal
    public enum TipoAnimal {
        GATO, CACHORRO, AMBOS
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
