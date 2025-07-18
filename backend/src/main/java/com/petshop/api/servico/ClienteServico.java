package com.petshop.api.servico;

import com.petshop.api.modelo.Cliente;
import com.petshop.api.modelo.Pet;
import com.petshop.api.repositorio.ClienteRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteServico {

    private final ClienteRepositorio clienteRepositorio;

    @Autowired
    public ClienteServico(ClienteRepositorio clienteRepositorio) {
        this.clienteRepositorio = clienteRepositorio;
    }

    public List<Cliente> listarTodos() {
        return clienteRepositorio.findAll();
    }

    public Optional<Cliente> buscarPorId(Long id) {
        return clienteRepositorio.findById(id);
    }

    public Optional<Cliente> buscarPorEmail(String email) {
        return clienteRepositorio.findByEmail(email);
    }

    public Cliente salvar(Cliente cliente) {
        return clienteRepositorio.save(cliente);
    }

    public void excluir(Long id) {
        clienteRepositorio.deleteById(id);
    }
    
    // Adiciona um pet ao cliente
    public Cliente adicionarPet(Long clienteId, Pet pet) {
        Cliente cliente = clienteRepositorio.findById(clienteId)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
        cliente.adicionarPet(pet);
        return clienteRepositorio.save(cliente);
    }
}
