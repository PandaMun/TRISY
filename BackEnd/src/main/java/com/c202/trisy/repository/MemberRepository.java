package com.c202.trisy.repository;

import com.c202.trisy.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByEmailAndPassword(String email, String password);
    Optional<Member> findByEmail(String email);
    List<Member> findByName(String name);
    List<Member> findByIdIn(List<Long> clientIdList);

    Optional<Member> findByProviderAndProviderId(String provider, String providerId);
}
