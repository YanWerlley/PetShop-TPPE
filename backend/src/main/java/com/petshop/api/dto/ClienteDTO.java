package com.petshop.api.dto;

import com.petshop.api.modelo.Cliente;
import com.petshop.api.modelo.Pet;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class ClienteDTO {
    private Long id;
    private String nome;
    private String email;
    private String cidade;
    private String estado;
    private String cep;
    private List<PetDTO> pets = new ArrayList<>();

    // Construtores
    public ClienteDTO() {
    }

    public ClienteDTO(Cliente cliente) {
        this.id = cliente.getId();
        this.nome = cliente.getNome();
        this.email = cliente.getEmail();
        this.cidade = cliente.getCidade();
        this.estado = cliente.getEstado();
        this.cep = cliente.getCep();
        
        if (cliente.getPets() != null) {
            this.pets = cliente.getPets().stream()
                .map(PetDTO::new)
                .collect(Collectors.toList());
        }
    }

    // Converter DTO para entidade
    public Cliente toEntity() {
        Cliente cliente = new Cliente();
        cliente.setId(this.id);
        cliente.setNome(this.nome);
        cliente.setEmail(this.email);
        cliente.setCidade(this.cidade);
        cliente.setEstado(this.estado);
        cliente.setCep(this.cep);
        
        return cliente;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public List<PetDTO> getPets() {
        return pets;
    }

    public void setPets(List<PetDTO> pets) {
        this.pets = pets;
    }
}
