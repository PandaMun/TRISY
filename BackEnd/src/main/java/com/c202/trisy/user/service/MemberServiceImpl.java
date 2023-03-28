package com.c202.trisy.user.service;

import com.c202.trisy.entity.Member;
import com.c202.trisy.entity.Role;
import com.c202.trisy.repository.MemberRepository;
import com.c202.trisy.user.dto.MemberDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder passwordEncoder;


    @Override
    public Long createMember(MemberDto.Basic memberDto) {
        Member member = Member.builder()
                .email(memberDto.getEmail())
                .password(passwordEncoder.encode(memberDto.getPassword()))
                .name(memberDto.getName())
                .role(Role.USER)
                .birth(LocalDate.parse(memberDto.getBirth(), DateTimeFormatter.ISO_DATE))
                .phone(memberDto.getPhone())
                .build();

        Member save = memberRepository.save(member);
        return save.getId();
    }

    @Override
    public Boolean checkIdDuplicated(String email) {

        Optional<Member> byEmail = memberRepository.findByEmail(email);

        if(byEmail.isPresent()) // 이미 가입한 email인 경우
            return true;

        return false;
    }

    @Override
    public Long updateUser(Member authUser, MemberDto.Basic memberDto) {

        authUser.changeName(memberDto.getName());
        authUser.changeBirth(LocalDate.parse(memberDto.getBirth(), DateTimeFormatter.ISO_DATE));
        authUser.changePhone(memberDto.getPhone());

        Member save = memberRepository.save(authUser);

        return save.getId();
    }

    @Override
    public boolean deleteUser(Member authUser) {

        memberRepository.delete(authUser);
        return true;
    }
}
