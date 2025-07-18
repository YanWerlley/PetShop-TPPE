package com.petshop.api.controlador;

import com.petshop.api.dto.PetDTO;
import com.petshop.api.modelo.Pet;
import com.petshop.api.servico.PetServico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/pets")
@CrossOrigin(origins = "*")
public class PetControlador {

    private final PetServico petServico;

    @Autowired
    public PetControlador(PetServico petServico) {
        this.petServico = petServico;
    }

    @GetMapping
    public List<PetDTO> listarTodos() {
        return petServico.listarTodos().stream()
                .map(PetDTO::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/dono/{donoId}")
    public List<PetDTO> listarPorDono(@PathVariable Long donoId) {
        return petServico.listarPorDono(donoId).stream()
                .map(PetDTO::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PetDTO> buscarPorId(@PathVariable Long id) {
        return petServico.buscarPorId(id)
                .map(pet -> ResponseEntity.ok(new PetDTO(pet)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<PetDTO> criar(@RequestBody PetDTO petDTO) {
        Pet pet = petDTO.toEntity();
        Pet novoPet = petServico.salvar(pet);
        return ResponseEntity.status(HttpStatus.CREATED).body(new PetDTO(novoPet));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PetDTO> atualizar(@PathVariable Long id, @RequestBody PetDTO petDTO) {
        return petServico.buscarPorId(id)
                .map(petExistente -> {
                    Pet pet = petDTO.toEntity();
                    pet.setId(id);
                    Pet petAtualizado = petServico.salvar(pet);
                    return ResponseEntity.ok(new PetDTO(petAtualizado));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        if (!petServico.buscarPorId(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        
        petServico.excluir(id);
        return ResponseEntity.noContent().build();
    }
}
