package com.c202.trisy.board.service;

import com.c202.trisy.board.dto.BoardRequest;
import com.c202.trisy.board.dto.BoardResponse;
import com.c202.trisy.board.repository.BoardRepository;
import com.c202.trisy.entity.Board;
import com.c202.trisy.repository.MemberRepository;
import com.c202.trisy.tour.dto.TourRequest;
import com.c202.trisy.tour.repository.TourRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.print.attribute.IntegerSyntax;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@RequiredArgsConstructor
@Service
public class BoardServiceImpl implements BoardService {

    private final BoardRepository boardRepository;
    private final MemberRepository memberRepository;
    private final TourRepository tourRepository;
    @Override
    public Page<BoardResponse> getBoardList(Pageable pageable) {
        Page<Board> boardList = boardRepository.findAll(pageable);

        Page<BoardResponse> boardResponseList = new BoardResponse().toDtoList(boardList);


        return boardResponseList;
    }

    @Override
    public BoardResponse getBoard(Long boardId) {
        Board board = boardRepository.findById(boardId).get();

        board.addViews();
        boardRepository.save(board);

        BoardResponse boardResponse = BoardResponse.builder()
                .id(board.getId())
                .content(board.getContent())
                .title(board.getTitle())
                .views(board.getViews())
                .tourId(board.getTourSchedule().getId())
                .profileUrl(board.getMember().getProfileUrl())
                .memberEmail(board.getMember().getEmail())
                .memberId(board.getMember().getId())
                .nickname(board.getMember().getNickname())
                .thumbnailUrl(board.getThumbnailUrl())
                .createdTime(board.getCreatedTime())
                .updatedTime(board.getUpdatedTime())
                .build();

        return boardResponse;
    }

    @Override
    public List<BoardResponse> getBoardByViews() {
        List<Board> list = boardRepository.findAllByOrderByViewsDesc();
        List<BoardResponse> boardResponseList = new ArrayList<>();
        for(int i = 0; i< list.size() && i < 4; i++) {

            BoardResponse boardResponse = BoardResponse.builder()
                    .id(list.get(i).getId())
                    .content(list.get(i).getContent())
                    .title(list.get(i).getTitle())
                    .views(list.get(i).getViews())
                    .tourId(list.get(i).getTourSchedule().getId())
                    .profileUrl(list.get(i).getMember().getProfileUrl())
                    .memberEmail(list.get(i).getMember().getEmail())
                    .memberId(list.get(i).getMember().getId())
                    .nickname(list.get(i).getMember().getNickname())
                    .thumbnailUrl(list.get(i).getThumbnailUrl())
                    .createdTime(list.get(i).getCreatedTime())
                    .updatedTime(list.get(i).getUpdatedTime())
                    .build();
            boardResponseList.add(boardResponse);
        }
        return boardResponseList;
    }


    @Override
    public void createBoard(String memberEmail, BoardRequest boardRequest) {

        Board board = Board.builder()
                .content(boardRequest.getContent())
                .title(boardRequest.getTitle())
                .thumbnailUrl(boardRequest.getThumbnailUrl())
                .member(memberRepository.findByEmail(memberEmail).get())
                .tourSchedule(tourRepository.findById(boardRequest.getTourId()).get())
                .createdTime(LocalDateTime.now())
                .updatedTime(LocalDateTime.now())
                .views(0)
                .build();

        boardRepository.save(board);

    }

    @Override
    public void updateBoard(Long boardId, BoardRequest boardRequest) {
        Board board = boardRepository.findById(boardId).get();
        board.updateBoard(boardRequest.getTitle(), boardRequest.getContent(), boardRequest.getThumbnailUrl(),LocalDateTime.now());

        boardRepository.save(board);
    }

    @Override
    public void deleteBoard(Long boardId) {

        boardRepository.deleteById(boardId);
    }
}
