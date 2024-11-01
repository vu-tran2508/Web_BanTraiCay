package com.edu.shop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.edu.shop.domain.PayMent;

@Repository
public interface PayMentRepostory  extends JpaRepository<PayMent, Integer>{

}
