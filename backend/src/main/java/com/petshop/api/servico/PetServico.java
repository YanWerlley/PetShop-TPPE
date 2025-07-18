package com.petshop.api.servico;

import com.petshop.api.modelo.Pet;
import com.petshop.api.repositorio.PetRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PetServico {

    private final PetRepositorio petRepositorio;

    @Autowired
    public PetServico(PetRepositorio petRepositorio) {
        this.petRepositorio = petRepositorio;
    }

    public List<Pet> listarTodos() {
        return petRepositorio.findAll();
    }

    public List<Pet> listarPorDono(Long donoId) {
        return petRepositorio.findByDonoId(donoId);
    }

    public Optional<Pet> buscarPorId(Long id) {
        return petRepositorio.findById(id);
    }

    public Pet salvar(Pet pet) {
        return petRepositorio.save(pet);
    }

    public void excluir(Long id) {
        petRepositorio.deleteById(id);
    }
}
