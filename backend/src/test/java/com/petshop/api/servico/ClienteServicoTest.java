package com.petshop.api.servico;

import com.petshop.api.modelo.Cliente;
import com.petshop.api.modelo.Pet;
import com.petshop.api.repositorio.ClienteRepositorio;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ClienteServicoTest {

    @Mock
    private ClienteRepositorio clienteRepositorio;

    @InjectMocks
    private ClienteServico clienteServico;

    private Cliente cliente;
    private Pet pet;

    @BeforeEach
    void setUp() {
        // Configuração do cliente de teste
        cliente = new Cliente();
        cliente.setId(1L);
        cliente.setNome("João Silva");
        cliente.setEmail("joao@email.com");
        cliente.setSenha("senha123");
        cliente.setCidade("São Paulo");
        cliente.setEstado("SP");
        cliente.setCep("01234-567");

        // Configuração do pet de teste
        pet = new Pet();
        pet.setId(1L);
        pet.setNome("Rex");
        pet.setRaca("Labrador");
        pet.setIdade(3);
        pet.setDoencas("Nenhuma");
    }

    @Test
    void deveListarTodosClientes() {
        // Arrange
        List<Cliente> clientes = Arrays.asList(cliente);
        when(clienteRepositorio.findAll()).thenReturn(clientes);

        // Act
        List<Cliente> resultado = clienteServico.listarTodos();

        // Assert
        assertThat(resultado).hasSize(1);
        assertThat(resultado.get(0).getNome()).isEqualTo("João Silva");
        verify(clienteRepositorio, times(1)).findAll();
    }

    @Test
    void deveBuscarClientePorId() {
        // Arrange
        when(clienteRepositorio.findById(1L)).thenReturn(Optional.of(cliente));

        // Act
        Optional<Cliente> resultado = clienteServico.buscarPorId(1L);

        // Assert
        assertThat(resultado).isPresent();
        assertThat(resultado.get().getNome()).isEqualTo("João Silva");
        verify(clienteRepositorio, times(1)).findById(1L);
    }

    @Test
    void deveRetornarVazioQuandoClienteNaoExiste() {
        // Arrange
        when(clienteRepositorio.findById(99L)).thenReturn(Optional.empty());

        // Act
        Optional<Cliente> resultado = clienteServico.buscarPorId(99L);

        // Assert
        assertThat(resultado).isEmpty();
        verify(clienteRepositorio, times(1)).findById(99L);
    }

    @Test
    void deveBuscarClientePorEmail() {
        // Arrange
        when(clienteRepositorio.findByEmail("joao@email.com")).thenReturn(Optional.of(cliente));

        // Act
        Optional<Cliente> resultado = clienteServico.buscarPorEmail("joao@email.com");

        // Assert
        assertThat(resultado).isPresent();
        assertThat(resultado.get().getNome()).isEqualTo("João Silva");
        verify(clienteRepositorio, times(1)).findByEmail("joao@email.com");
    }

    @Test
    void deveSalvarCliente() {
        // Arrange
        when(clienteRepositorio.save(any(Cliente.class))).thenReturn(cliente);

        // Act
        Cliente resultado = clienteServico.salvar(cliente);

        // Assert
        assertThat(resultado).isNotNull();
        assertThat(resultado.getNome()).isEqualTo("João Silva");
        verify(clienteRepositorio, times(1)).save(cliente);
    }

    @Test
    void deveExcluirCliente() {
        // Arrange
        doNothing().when(clienteRepositorio).deleteById(1L);

        // Act
        clienteServico.excluir(1L);

        // Assert
        verify(clienteRepositorio, times(1)).deleteById(1L);
    }

    @Test
    void deveAdicionarPetAoCliente() {
        // Arrange
        when(clienteRepositorio.findById(1L)).thenReturn(Optional.of(cliente));
        when(clienteRepositorio.save(any(Cliente.class))).thenReturn(cliente);

        // Act
        Cliente resultado = clienteServico.adicionarPet(1L, pet);

        // Assert
        assertThat(resultado).isNotNull();
        assertThat(resultado.getPets()).contains(pet);
        verify(clienteRepositorio, times(1)).findById(1L);
        verify(clienteRepositorio, times(1)).save(cliente);
    }

    @Test
    void deveLancarExcecaoQuandoClienteNaoExisteAoAdicionarPet() {
        // Arrange
        when(clienteRepositorio.findById(99L)).thenReturn(Optional.empty());

        // Act & Assert
        assertThatThrownBy(() -> clienteServico.adicionarPet(99L, pet))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Cliente não encontrado");
        
        verify(clienteRepositorio, times(1)).findById(99L);
        verify(clienteRepositorio, never()).save(any(Cliente.class));
    }
}
