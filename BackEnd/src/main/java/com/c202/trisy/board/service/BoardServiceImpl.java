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
        BoardResponse boardResponse = BoardResponse.builder()
                .content(board.getContent())
                .title(board.getTitle())
                .tourId(board.getTourSchedule().getId())
                .memberEmail(board.getMember().getEmail())
                .memberId(board.getMember().getId())
                .nickname(board.getMember().getNickname())
                .build();

        return boardResponse;
    }

    @Override
    public List<BoardResponse> getRandomBoard() {
        List<Board> boardList = boardRepository.findAll();
        List<BoardResponse> boardResponseList = new ArrayList<>();
        List<Integer> randomList = new ArrayList<>();
        for(int i = 1; i <= boardList.size() || i<=4; i++){ // i가 4보다 작을때 or i가 boardList의 사이즈보다 작거나 같을때
            randomList.add(new Random().nextInt(boardList.size()));
            for(int j = 0; j < i; j++){
                if(randomList.get(j) == randomList.get(i)){
                    i--;
                }
            }
        }
        for(int i : randomList){
            BoardResponse boardResponse = BoardResponse.builder()
                    .content(boardList.get(i).getContent())
                    .title(boardList.get(i).getTitle())
                    .tourId(boardList.get(i).getTourSchedule().getId())
                    .memberId(boardList.get(i).getMember().getId())
                    .memberEmail(boardList.get(i).getMember().getEmail())
                    .nickname(boardList.get(i).getMember().getNickname())
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
