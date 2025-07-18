package com.petshop.api.controlador;

import com.petshop.api.dto.VacinaDTO;
import com.petshop.api.modelo.Vacina;
import com.petshop.api.servico.VacinaServico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/vacinas")
@CrossOrigin(origins = "*")
public class VacinaControlador {

    private final VacinaServico vacinaServico;

    @Autowired
    public VacinaControlador(VacinaServico vacinaServico) {
        this.vacinaServico = vacinaServico;
    }

    @GetMapping
    public List<VacinaDTO> listarTodas() {
        return vacinaServico.listarTodas().stream()
                .map(VacinaDTO::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<VacinaDTO> buscarPorId(@PathVariable Long id) {
        return vacinaServico.buscarPorId(id)
                .map(vacina -> ResponseEntity.ok(new VacinaDTO(vacina)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<VacinaDTO> criar(@RequestBody VacinaDTO vacinaDTO) {
        Vacina vacina = vacinaDTO.toEntity();
        Vacina novaVacina = vacinaServico.salvar(vacina);
        return ResponseEntity.status(HttpStatus.CREATED).body(new VacinaDTO(novaVacina));
    }

    @PutMapping("/{id}")
    public ResponseEntity<VacinaDTO> atualizar(@PathVariable Long id, @RequestBody VacinaDTO vacinaDTO) {
        return vacinaServico.buscarPorId(id)
                .map(vacinaExistente -> {
                    Vacina vacina = vacinaDTO.toEntity();
                    vacina.setId(id);
                    Vacina vacinaAtualizada = vacinaServico.salvar(vacina);
                    return ResponseEntity.ok(new VacinaDTO(vacinaAtualizada));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        if (!vacinaServico.buscarPorId(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        
        vacinaServico.excluir(id);
        return ResponseEntity.noContent().build();
    }
}
