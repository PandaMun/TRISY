package com.c202.trisy.user.service;

import com.c202.trisy.entity.Member;
import com.c202.trisy.user.dto.MemberDto;

public interface MemberService {

    public Long createMember(MemberDto.Basic memberDto);

    public Boolean checkIdDuplicated(String id);

    Long updateUser(Member authUser, MemberDto.Basic memberDto);

    boolean deleteUser(Member authUser);
}
