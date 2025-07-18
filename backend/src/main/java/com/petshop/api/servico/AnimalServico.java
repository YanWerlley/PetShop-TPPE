package com.petshop.api.servico;

import com.petshop.api.dto.AnimalDTO;
import com.petshop.api.dto.CachorroDTO;
import com.petshop.api.dto.GatoDTO;
import com.petshop.api.modelo.Pet;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AnimalServico {
    
    // Método que demonstra polimorfismo usando a classe abstrata AnimalDTO
    public List<AnimalDTO> classificarAnimais(List<Pet> pets) {
        List<AnimalDTO> animaisClassificados = new ArrayList<>();
        
        for (Pet pet : pets) {
            // Extração de método para melhorar legibilidade (Clean Code)
            AnimalDTO animalDTO = converterParaDTO(pet);
            if (animalDTO != null) {
                animaisClassificados.add(animalDTO);
            }
        }
        
        return animaisClassificados;
    }
    
    // Método extraído (Refatoração - Extract Method)
    private AnimalDTO converterParaDTO(Pet pet) {
        // Lógica simplificada para exemplo
        if (pet.getRaca().toLowerCase().contains("gato")) {
            GatoDTO gatoDTO = new GatoDTO();
            preencherDadosComuns(gatoDTO, pet);
            gatoDTO.setCastrado(true); // Valor padrão para exemplo
            return gatoDTO;
        } else if (pet.getRaca().toLowerCase().contains("cachorro") || 
                  pet.getRaca().toLowerCase().contains("cão")) {
            CachorroDTO cachorroDTO = new CachorroDTO();
            preencherDadosComuns(cachorroDTO, pet);
            definirPorte(cachorroDTO, pet);
            return cachorroDTO;
        }
        return null;
    }
    
    // Outro método extraído para demonstrar refatoração
    private void preencherDadosComuns(AnimalDTO animalDTO, Pet pet) {
        animalDTO.setNome(pet.getNome());
        animalDTO.setIdade(pet.getIdade());
        animalDTO.setRaca(pet.getRaca());
    }
    
    // Método específico para cachorro
    private void definirPorte(CachorroDTO cachorroDTO, Pet pet) {
        // Lógica simplificada para exemplo
        if (pet.getRaca().toLowerCase().contains("pequeno")) {
            cachorroDTO.setPorte("PEQUENO");
        } else if (pet.getRaca().toLowerCase().contains("grande")) {
            cachorroDTO.setPorte("GRANDE");
        } else {
            cachorroDTO.setPorte("MÉDIO");
        }
    }
}
