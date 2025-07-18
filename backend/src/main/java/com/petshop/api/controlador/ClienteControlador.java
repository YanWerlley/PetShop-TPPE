package com.petshop.api.controlador;

import com.petshop.api.dto.ClienteDTO;
import com.petshop.api.dto.PetDTO;
import com.petshop.api.modelo.Cliente;
import com.petshop.api.modelo.Pet;
import com.petshop.api.servico.ClienteServico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/clientes")
@CrossOrigin(origins = "*")
public class ClienteControlador {

    private final ClienteServico clienteServico;

    @Autowired
    public ClienteControlador(ClienteServico clienteServico) {
        this.clienteServico = clienteServico;
    }

    @GetMapping
    public List<ClienteDTO> listarTodos() {
        return clienteServico.listarTodos().stream()
                .map(ClienteDTO::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClienteDTO> buscarPorId(@PathVariable Long id) {
        return clienteServico.buscarPorId(id)
                .map(cliente -> ResponseEntity.ok(new ClienteDTO(cliente)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ClienteDTO> criar(@RequestBody ClienteDTO clienteDTO) {
        Cliente cliente = clienteDTO.toEntity();
        Cliente novoCliente = clienteServico.salvar(cliente);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ClienteDTO(novoCliente));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClienteDTO> atualizar(@PathVariable Long id, @RequestBody ClienteDTO clienteDTO) {
        return clienteServico.buscarPorId(id)
                .map(clienteExistente -> {
                    Cliente cliente = clienteDTO.toEntity();
                    cliente.setId(id);
                    Cliente clienteAtualizado = clienteServico.salvar(cliente);
                    return ResponseEntity.ok(new ClienteDTO(clienteAtualizado));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        if (!clienteServico.buscarPorId(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        
        clienteServico.excluir(id);
        return ResponseEntity.noContent().build();
    }
    
    @PostMapping("/{clienteId}/pets")
    public ResponseEntity<ClienteDTO> adicionarPet(@PathVariable Long clienteId, @RequestBody PetDTO petDTO) {
        try {
            Pet pet = petDTO.toEntity();
            Cliente clienteAtualizado = clienteServico.adicionarPet(clienteId, pet);
            return ResponseEntity.ok(new ClienteDTO(clienteAtualizado));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
