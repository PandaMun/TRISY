// 회원가입
export interface userSignUp {
  name: string;
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
// 게시글
export interface post {
  id: string;
  title: string;
  content: string;
  image: string;
}
