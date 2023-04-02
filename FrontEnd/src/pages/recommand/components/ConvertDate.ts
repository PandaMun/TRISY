export const ConvertDate = (dateString: string) => {
  const date = new Date(dateString);
  const month = date.getMonth() + 1; // month는 0부터 시작하기 때문에 1을 더해줍니다.
  const day = date.getDate();
  return `${month}월 ${day}일`;
};
