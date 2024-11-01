package com.edu.shop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.edu.shop.domain.Role;



@Repository
public interface RoleRespository extends JpaRepository<Role, Long> {
        Role findByName (String name);
}
