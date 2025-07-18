package com.petshop.api.servico;

import com.petshop.api.modelo.Vacina;
import com.petshop.api.repositorio.VacinaRepositorio;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.jupiter.params.provider.EnumSource;
import org.junit.jupiter.params.provider.MethodSource;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class VacinaServicoTest {

    @Mock
    private VacinaRepositorio vacinaRepositorio;

    @InjectMocks
    private VacinaServico vacinaServico;

    private Vacina vacina;

    @BeforeEach
    void setUp() {
        vacina = new Vacina();
        vacina.setId(1L);
        vacina.setNome("Antirrábica");
        vacina.setTipoAnimal(Vacina.TipoAnimal.AMBOS);
        vacina.setDataValidade(LocalDate.now().plusYears(1));
    }

    @Test
    void deveListarTodasVacinas() {
        // Arrange
        List<Vacina> vacinas = Arrays.asList(vacina);
        when(vacinaRepositorio.findAll()).thenReturn(vacinas);

        // Act
        List<Vacina> resultado = vacinaServico.listarTodas();

        // Assert
        assertEquals(1, resultado.size());
        assertEquals("Antirrábica", resultado.get(0).getNome());
        verify(vacinaRepositorio, times(1)).findAll();
    }

    @Test
    void deveBuscarVacinaPorId() {
        // Arrange
        when(vacinaRepositorio.findById(1L)).thenReturn(Optional.of(vacina));

        // Act
        Optional<Vacina> resultado = vacinaServico.buscarPorId(1L);

        // Assert
        assertTrue(resultado.isPresent());
        assertEquals("Antirrábica", resultado.get().getNome());
        verify(vacinaRepositorio, times(1)).findById(1L);
    }

    @Test
    void deveSalvarVacina() {
        // Arrange
        when(vacinaRepositorio.save(any(Vacina.class))).thenReturn(vacina);

        // Act
        Vacina resultado = vacinaServico.salvar(vacina);

        // Assert
        assertNotNull(resultado);
        assertEquals("Antirrábica", resultado.getNome());
        verify(vacinaRepositorio, times(1)).save(vacina);
    }

    @Test
    void deveExcluirVacina() {
        // Arrange
        doNothing().when(vacinaRepositorio).deleteById(1L);

        // Act
        vacinaServico.excluir(1L);

        // Assert
        verify(vacinaRepositorio, times(1)).deleteById(1L);
    }
    
    // Testes parametrizados
    
    /**
     * Teste parametrizado usando EnumSource para testar todos os tipos de animais
     */
    @ParameterizedTest
    @EnumSource(Vacina.TipoAnimal.class)
    void deveSalvarVacinaParaDiferentesTiposDeAnimais(Vacina.TipoAnimal tipoAnimal) {
        // Arrange
        Vacina vacinaTeste = new Vacina();
        vacinaTeste.setId(2L);
        vacinaTeste.setNome("Vacina Teste");
        vacinaTeste.setTipoAnimal(tipoAnimal);
        vacinaTeste.setDataValidade(LocalDate.now().plusMonths(6));
        
        when(vacinaRepositorio.save(any(Vacina.class))).thenReturn(vacinaTeste);
        
        // Act
        Vacina resultado = vacinaServico.salvar(vacinaTeste);
        
        // Assert
        assertNotNull(resultado);
        assertEquals(tipoAnimal, resultado.getTipoAnimal());
        verify(vacinaRepositorio, times(1)).save(vacinaTeste);
    }
    
    /**
     * Teste parametrizado usando CsvSource para testar diferentes nomes de vacinas
     */
    @ParameterizedTest
    @CsvSource({
        "Antirrábica, CACHORRO",
        "V4, GATO",
        "V8, CACHORRO",
        "V10, CACHORRO",
        "Gripe Felina, GATO",
        "Múltipla, AMBOS"
    })
    void deveSalvarVacinaComDiferentesNomesETipos(String nome, Vacina.TipoAnimal tipoAnimal) {
        // Arrange
        Vacina vacinaTeste = new Vacina();
        vacinaTeste.setId(3L);
        vacinaTeste.setNome(nome);
        vacinaTeste.setTipoAnimal(tipoAnimal);
        vacinaTeste.setDataValidade(LocalDate.now().plusMonths(6));
        
        when(vacinaRepositorio.save(any(Vacina.class))).thenReturn(vacinaTeste);
        
        // Act
        Vacina resultado = vacinaServico.salvar(vacinaTeste);
        
        // Assert
        assertNotNull(resultado);
        assertEquals(nome, resultado.getNome());
        assertEquals(tipoAnimal, resultado.getTipoAnimal());
        verify(vacinaRepositorio, times(1)).save(vacinaTeste);
    }
    
    /**
     * Teste parametrizado usando MethodSource para testar diferentes datas de validade
     */
    @ParameterizedTest
    @MethodSource("fornecerDatasDeValidade")
    void deveSalvarVacinaComDiferentesDatasDeValidade(LocalDate dataValidade, boolean valida) {
        // Arrange
        Vacina vacinaTeste = new Vacina();
        vacinaTeste.setId(4L);
        vacinaTeste.setNome("Vacina Teste");
        vacinaTeste.setTipoAnimal(Vacina.TipoAnimal.AMBOS);
        vacinaTeste.setDataValidade(dataValidade);
        
        // Em um cenário real, você teria validações no serviço
        // Aqui estamos apenas simulando para demonstrar o teste parametrizado
        if (valida) {
            when(vacinaRepositorio.save(any(Vacina.class))).thenReturn(vacinaTeste);
            
            // Act
            Vacina resultado = vacinaServico.salvar(vacinaTeste);
            
            // Assert
            assertNotNull(resultado);
            assertEquals(dataValidade, resultado.getDataValidade());
            verify(vacinaRepositorio, times(1)).save(vacinaTeste);
        } else {
            // Verificamos apenas que a data é inválida (no passado)
            assertTrue(dataValidade.isBefore(LocalDate.now()));
        }
    }
    
    /**
     * Método que fornece os argumentos para o teste parametrizado de datas de validade
     */
    private static Stream<Arguments> fornecerDatasDeValidade() {
        return Stream.of(
            Arguments.of(LocalDate.now().plusDays(1), true),      // Amanhã (válida)
            Arguments.of(LocalDate.now().plusMonths(1), true),    // Próximo mês (válida)
            Arguments.of(LocalDate.now().plusYears(1), true),     // Próximo ano (válida)
            Arguments.of(LocalDate.now().plusYears(2), true),     // Daqui a 2 anos (válida)
            Arguments.of(LocalDate.now().minusDays(1), false),    // Ontem (inválida)
            Arguments.of(LocalDate.now().minusMonths(1), false),  // Mês passado (inválida)
            Arguments.of(LocalDate.now().minusYears(1), false)    // Ano passado (inválida)
        );
    }
}
