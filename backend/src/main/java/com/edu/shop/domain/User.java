package com.edu.shop.domain;


import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String email;
    private String password;
    
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Customer customer;
    @JsonIgnore
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    @ToString.Exclude
    private Account account;



    
    
	@ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinTable(name = "users_roles", joinColumns = @JoinColumn(name = "user_id", 
	referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
	private Set<Role> roles;
	
	
    public User(Long id, String email, String password, Set<Role> roles) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.roles = roles;
    }
	
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		 Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
		 roles.stream().forEach(i-> authorities.add(new SimpleGrantedAuthority(i.getName())));
		return List.of(new SimpleGrantedAuthority(authorities.toString()));
	}
	
	@Override
	public String getUsername() {
	    return this.email;
	}

	@Override
	public String getPassword() {
	    return this.password;
	}

	
	@Override
	public boolean isAccountNonExpired() {
	    return true; // hoặc triển khai kiểm tra logic của bạn ở đây
	}

	@Override
	public boolean isAccountNonLocked() {
	    return true; // hoặc triển khai kiểm tra logic của bạn ở đây
	}

	@Override
	public boolean isCredentialsNonExpired() {
	    return true; // hoặc triển khai kiểm tra logic của bạn ở đây
	}

	@Override
	public boolean isEnabled() {
	    return true; // hoặc triển khai kiểm tra logic của bạn ở đây
	}
	@Override
	public int hashCode() {
	    return Objects.hash(id, email, password);
	}



	

	
	
   
}
