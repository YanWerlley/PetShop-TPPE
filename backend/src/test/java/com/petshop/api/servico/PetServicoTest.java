package com.petshop.api.servico;

import com.petshop.api.modelo.Cliente;
import com.petshop.api.modelo.Pet;
import com.petshop.api.repositorio.PetRepositorio;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class PetServicoTest {

    @Mock
    private PetRepositorio petRepositorio;

    @InjectMocks
    private PetServico petServico;

    private Pet pet1;
    private Pet pet2;
    private Cliente cliente;

    @BeforeEach
    void setUp() {
        // Configuração do cliente
        cliente = new Cliente();
        cliente.setId(1L);
        cliente.setNome("João Silva");
        cliente.setEmail("joao@email.com");

        // Configuração dos pets
        pet1 = new Pet();
        pet1.setId(1L);
        pet1.setNome("Rex");
        pet1.setRaca("Labrador");
        pet1.setIdade(3);
        pet1.setDoencas("Nenhuma");
        pet1.setDono(cliente);

        pet2 = new Pet();
        pet2.setId(2L);
        pet2.setNome("Totó");
        pet2.setRaca("Poodle");
        pet2.setIdade(2);
        pet2.setDoencas("Nenhuma");
        pet2.setDono(cliente);
    }

    @Test
    void deveListarTodosPets() {
        // Arrange
        List<Pet> pets = Arrays.asList(pet1, pet2);
        when(petRepositorio.findAll()).thenReturn(pets);

        // Act
        List<Pet> resultado = petServico.listarTodos();

        // Assert
        assertThat(resultado).hasSize(2);
        assertThat(resultado).containsExactly(pet1, pet2);
        verify(petRepositorio, times(1)).findAll();
    }

    @Test
    void deveListarPetsPorDono() {
        // Arrange
        List<Pet> pets = Arrays.asList(pet1, pet2);
        when(petRepositorio.findByDonoId(1L)).thenReturn(pets);

        // Act
        List<Pet> resultado = petServico.listarPorDono(1L);

        // Assert
        assertThat(resultado).hasSize(2);
        assertThat(resultado).containsExactly(pet1, pet2);
        verify(petRepositorio, times(1)).findByDonoId(1L);
    }

    @Test
    void deveBuscarPetPorId() {
        // Arrange
        when(petRepositorio.findById(1L)).thenReturn(Optional.of(pet1));

        // Act
        Optional<Pet> resultado = petServico.buscarPorId(1L);

        // Assert
        assertThat(resultado).isPresent();
        assertThat(resultado.get().getNome()).isEqualTo("Rex");
        verify(petRepositorio, times(1)).findById(1L);
    }

    @Test
    void deveSalvarPet() {
        // Arrange
        when(petRepositorio.save(any(Pet.class))).thenReturn(pet1);

        // Act
        Pet resultado = petServico.salvar(pet1);

        // Assert
        assertThat(resultado).isNotNull();
        assertThat(resultado.getNome()).isEqualTo("Rex");
        verify(petRepositorio, times(1)).save(pet1);
    }

    @Test
    void deveExcluirPet() {
        // Arrange
        doNothing().when(petRepositorio).deleteById(1L);

        // Act
        petServico.excluir(1L);

        // Assert
        verify(petRepositorio, times(1)).deleteById(1L);
    }

    // Teste parametrizado para validar diferentes idades de pets
    @ParameterizedTest
    @MethodSource("fornecerPetsComDiferentesIdades")
    void deveSalvarPetsComDiferentesIdades(int idade, boolean valido) {
        // Arrange
        Pet petTeste = new Pet();
        petTeste.setId(3L);
        petTeste.setNome("Teste");
        petTeste.setRaca("Raça Teste");
        petTeste.setIdade(idade);
        petTeste.setDoencas("Nenhuma");
        petTeste.setDono(cliente);

        if (valido) {
            when(petRepositorio.save(any(Pet.class))).thenReturn(petTeste);
        }

        // Act & Assert
        if (valido) {
            Pet resultado = petServico.salvar(petTeste);
            assertThat(resultado).isNotNull();
            assertThat(resultado.getIdade()).isEqualTo(idade);
            verify(petRepositorio, times(1)).save(petTeste);
        } else {
            // Em um cenário real, você teria validações no serviço
            // Aqui estamos apenas simulando para demonstrar o teste parametrizado
            assertThat(idade).isLessThan(0);
        }
    }

    // Método que fornece os argumentos para o teste parametrizado
    private static Stream<Arguments> fornecerPetsComDiferentesIdades() {
        return Stream.of(
            Arguments.of(0, true),    // Idade 0 é válida
            Arguments.of(1, true),    // Idade 1 é válida
            Arguments.of(5, true),    // Idade 5 é válida
            Arguments.of(10, true),   // Idade 10 é válida
            Arguments.of(15, true),   // Idade 15 é válida
            Arguments.of(20, true)    // Idade 20 é válida
            // Poderíamos adicionar casos inválidos se houvesse validação no serviço
            // Arguments.of(-1, false)  // Idade negativa seria inválida
        );
    }
}
