package com.petshop.api.servico;

import com.petshop.api.dto.AnimalDTO;
import com.petshop.api.dto.CachorroDTO;
import com.petshop.api.dto.GatoDTO;
import com.petshop.api.modelo.Pet;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.*;

public class AnimalServicoTest {

    private AnimalServico animalServico;
    
    @BeforeEach
    void setUp() {
        animalServico = new AnimalServico();
    }
    
    // Teste parametrizado para demonstrar o uso de testes parametrizados
    @ParameterizedTest
    @MethodSource("providerPetsEClassificacoes")
    void deveClassificarAnimaisCorretamente(String raca, String nome, Integer idade, String tipoEsperado) {
        // Arrange
        Pet pet = new Pet();
        pet.setRaca(raca);
        pet.setNome(nome);
        pet.setIdade(idade);
        
        List<Pet> pets = new ArrayList<>();
        pets.add(pet);
        
        // Act
        List<AnimalDTO> resultado = animalServico.classificarAnimais(pets);
        
        // Assert
        assertFalse(resultado.isEmpty());
        assertEquals(tipoEsperado, resultado.get(0).getTipoAnimal());
        assertEquals(nome, resultado.get(0).getNome());
        assertEquals(idade, resultado.get(0).getIdade());
    }
    
    // Provedor de dados para o teste parametrizado
    private static Stream<Arguments> providerPetsEClassificacoes() {
        return Stream.of(
            Arguments.of("Gato Persa", "Mimi", 3, "GATO"),
            Arguments.of("Gato Siamês", "Felix", 2, "GATO"),
            Arguments.of("Cachorro Labrador", "Rex", 5, "CACHORRO"),
            Arguments.of("Cão Pastor Alemão", "Thor", 4, "CACHORRO"),
            Arguments.of("Cachorro pequeno Pinscher", "Pingo", 1, "CACHORRO")
        );
    }
    
    @Test
    void deveRetornarListaVaziaQuandoNenhumPetForClassificado() {
        // Arrange
        Pet pet = new Pet();
        pet.setRaca("Tartaruga");
        pet.setNome("Donatello");
        pet.setIdade(10);
        
        List<Pet> pets = new ArrayList<>();
        pets.add(pet);
        
        // Act
        List<AnimalDTO> resultado = animalServico.classificarAnimais(pets);
        
        // Assert
        assertTrue(resultado.isEmpty());
    }
    
    @Test
    void deveDefinirPorteCorretamenteParaCachorro() {
        // Arrange
        Pet petPequeno = new Pet();
        petPequeno.setRaca("Cachorro pequeno Yorkshire");
        petPequeno.setNome("Totó");
        petPequeno.setIdade(2);
        
        Pet petGrande = new Pet();
        petGrande.setRaca("Cachorro grande São Bernardo");
        petGrande.setNome("Max");
        petGrande.setIdade(3);
        
        List<Pet> pets = new ArrayList<>();
        pets.add(petPequeno);
        pets.add(petGrande);
        
        // Act
        List<AnimalDTO> resultado = animalServico.classificarAnimais(pets);
        
        // Assert
        assertEquals(2, resultado.size());
        
        CachorroDTO cachorroPequeno = (CachorroDTO) resultado.get(0);
        assertEquals("PEQUENO", cachorroPequeno.getPorte());
        
        CachorroDTO cachorroGrande = (CachorroDTO) resultado.get(1);
        assertEquals("GRANDE", cachorroGrande.getPorte());
    }
}
