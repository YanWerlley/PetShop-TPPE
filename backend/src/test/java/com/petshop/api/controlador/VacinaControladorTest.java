package com.petshop.api.controlador;

import com.petshop.api.modelo.Vacina;
import com.petshop.api.servico.VacinaServico;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.Optional;
import java.util.stream.Stream;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(VacinaControlador.class)
public class VacinaControladorTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private VacinaServico vacinaServico;

    private Vacina vacina1;
    private Vacina vacina2;

    @BeforeEach
    void setUp() {
        vacina1 = new Vacina();
        vacina1.setId(1L);
        vacina1.setNome("Antirrábica");
        vacina1.setTipoAnimal(Vacina.TipoAnimal.AMBOS);
        vacina1.setDataValidade(LocalDate.now().plusYears(1));

        vacina2 = new Vacina();
        vacina2.setId(2L);
        vacina2.setNome("V10");
        vacina2.setTipoAnimal(Vacina.TipoAnimal.CACHORRO);
        vacina2.setDataValidade(LocalDate.now().plusMonths(6));
    }

    @Test
    void deveListarTodasVacinas() throws Exception {
        when(vacinaServico.listarTodas()).thenReturn(Arrays.asList(vacina1, vacina2));

        mockMvc.perform(get("/api/vacinas")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].nome").value("Antirrábica"))
                .andExpect(jsonPath("$[1].nome").value("V10"));
    }

    // Teste parametrizado para buscar vacina por ID
    @ParameterizedTest
    @MethodSource("providerVacinasPorId")
    void deveBuscarVacinaPorId(Long id, String nome, Vacina.TipoAnimal tipoAnimal) throws Exception {
        Vacina vacina = new Vacina();
        vacina.setId(id);
        vacina.setNome(nome);
        vacina.setTipoAnimal(tipoAnimal);
        vacina.setDataValidade(LocalDate.now().plusMonths(6));

        when(vacinaServico.buscarPorId(id)).thenReturn(Optional.of(vacina));

        mockMvc.perform(get("/api/vacinas/" + id)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(id))
                .andExpect(jsonPath("$.nome").value(nome))
                .andExpect(jsonPath("$.tipoAnimal").value(tipoAnimal.toString()));
    }

    // Provedor de dados para o teste parametrizado
    private static Stream<Arguments> providerVacinasPorId() {
        return Stream.of(
                Arguments.of(1L, "Antirrábica", Vacina.TipoAnimal.AMBOS),
                Arguments.of(2L, "V10", Vacina.TipoAnimal.CACHORRO),
                Arguments.of(3L, "V4", Vacina.TipoAnimal.GATO)
        );
    }

    @Test
    void deveRetornarNotFoundQuandoVacinaNaoExistir() throws Exception {
        when(vacinaServico.buscarPorId(99L)).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/vacinas/99")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }
}
