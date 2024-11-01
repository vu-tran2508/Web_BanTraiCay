package com.edu.shop.repository;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.query.NativeQuery;
import org.hibernate.transform.Transformers;
import org.hibernate.type.StandardBasicTypes;
import org.springframework.stereotype.Repository;

import com.edu.shop.domain.Role;
import com.edu.shop.domain.User;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Repository
public class RoleCustomRepo {
	@PersistenceContext
	private EntityManager entityManager;
	
	
	public List<Role> getRoles(User user) {
	    StringBuffer sql = new StringBuffer()
	            .append("SELECT r.name as name FROM users u " +
	                    "JOIN users_roles ur ON u.id = ur.user_id " +
	                    "JOIN roles r ON ur.role_id = r.id " +
	                    "WHERE 1=1");

	    if (user.getEmail() != null) {
	        sql.append(" AND u.email = :email");
	    }

	    NativeQuery<Role> query = ((Session) entityManager.getDelegate()).createNativeQuery(sql.toString());

	    if (user.getEmail() != null) {
	        query.setParameter("email", user.getEmail());
	    }
	    query.addScalar("name", StandardBasicTypes.STRING);
	    query.setResultTransformer(Transformers.aliasToBean(Role.class));

	    return query.list();
	}


 
}