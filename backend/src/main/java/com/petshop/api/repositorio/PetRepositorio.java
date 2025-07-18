package com.petshop.api.repositorio;

import com.petshop.api.modelo.Pet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PetRepositorio extends JpaRepository<Pet, Long> {
    List<Pet> findByDonoId(Long donoId);
}
