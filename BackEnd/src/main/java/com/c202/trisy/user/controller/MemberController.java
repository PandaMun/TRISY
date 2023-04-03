package com.c202.trisy.user.controller;

import com.c202.trisy.board.service.AwsS3Service;
import com.c202.trisy.entity.Member;
import com.c202.trisy.user.auth.PrincipalDetails;
import com.c202.trisy.user.dto.MemberDto;
import com.c202.trisy.user.dto.ProfileDto;
import com.c202.trisy.user.service.MemberService;
import com.c202.trisy.user.service.MemberServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.NoSuchFileException;
import java.security.Principal;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final AwsS3Service awsS3Service;



    @GetMapping("/mypage")
    public ResponseEntity<?> getUserInfo(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        Member member = principalDetails.getMember();
        MemberDto.Basic ud = MemberDto.Basic.builder()
                .id(member.getId())
                .role(member.getRole().toString())
                .email(member.getEmail())
                .profileUrl(member.getProfileUrl())
                .name(member.getName())
                .nickname(member.getNickname())
                .birth(member.getBirth().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")))
                .phone(member.getPhone())
                .build();

        return new ResponseEntity<MemberDto.Basic> (ud, HttpStatus.OK);
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<?> checkIdDuplicated(@PathVariable String email) {
        Map<String, Boolean> map = new HashMap<>();
        map.put("isExist", memberService.checkIdDuplicated(email));
        return new ResponseEntity<Map>(map, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody MemberDto.Basic memberDto) {
        Long memberId = memberService.createMember(memberDto);

        return new ResponseEntity<Long>(memberId, HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<?> update(@RequestBody MemberDto.Basic memberDto, @AuthenticationPrincipal PrincipalDetails principalDetails) {
        Member authUser = principalDetails.getMember();

        Long userMemberId = memberService.updateUser(authUser, memberDto);

        return new ResponseEntity<Long>(userMemberId, HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<?> remove(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        Member authUser = principalDetails.getMember();

        boolean check = memberService.deleteUser(authUser);
        return new ResponseEntity<String>("delete OK", HttpStatus.OK);

    }

    @PostMapping("/profile")
    public ResponseEntity<?> saveProfile(Authentication authentication,
                                         @RequestPart(value = "file") MultipartFile multipartFile){
        try{
            PrincipalDetails principal = (PrincipalDetails)authentication.getPrincipal();
            String url = awsS3Service.uploadFile(multipartFile);
            memberService.saveProfile(principal.getMember().getEmail(),url);
            return ResponseEntity.ok(new ProfileDto("등록에 성공하였습니다.",url));
        } catch (IllegalAccessException e) {
            return new ResponseEntity(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (NoSuchFileException e) {
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
