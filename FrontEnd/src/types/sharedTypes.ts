// 회원가입
export interface userSignUp {
  name: string;
  nickname: string;
  email: string;
  password: string;
  confirmPassword?: string;
  phone: string;
  birth: string; // Use string instead of Date to avoid validation errors
}
// 로그인
export interface userLogin {
  email: string;
  password: string;
}
// mock게시글
export interface post {
  id: string;
  title: string;
  content: string;
  image: string;
}

// 게시글
export interface board {
  title: string;
  content: string;
  id?: string;
  thumbnailUrl?: string | undefined;
  memberId?: string;
  createdTime?: string;
}

export interface createBoard {
  title: string;
  content: string;
  tourId: string;
  thumbnailUrl: string | undefined;
}

// 내 여행 리스트
export interface tourList {
  id: string;
  tourName: string;
  startDate: string;
  endDate: string;
}
