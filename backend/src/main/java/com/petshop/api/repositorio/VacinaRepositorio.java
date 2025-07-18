package com.petshop.api.repositorio;

import com.petshop.api.modelo.Vacina;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VacinaRepositorio extends JpaRepository<Vacina, Long> {
    // Métodos personalizados podem ser adicionados aqui
}
