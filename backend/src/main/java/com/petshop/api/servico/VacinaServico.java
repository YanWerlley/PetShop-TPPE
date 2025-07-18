package com.petshop.api.servico;

import com.petshop.api.modelo.Vacina;
import com.petshop.api.repositorio.VacinaRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VacinaServico {

    private final VacinaRepositorio vacinaRepositorio;

    @Autowired
    public VacinaServico(VacinaRepositorio vacinaRepositorio) {
        this.vacinaRepositorio = vacinaRepositorio;
    }

    public List<Vacina> listarTodas() {
        return vacinaRepositorio.findAll();
    }

    public Optional<Vacina> buscarPorId(Long id) {
        return vacinaRepositorio.findById(id);
    }

    public Vacina salvar(Vacina vacina) {
        return vacinaRepositorio.save(vacina);
    }

    public void excluir(Long id) {
        vacinaRepositorio.deleteById(id);
    }
}
