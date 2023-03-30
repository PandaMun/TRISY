export const handleDate = (date: string) => {
  const getDate = new Date(date);
  const year = getDate.getFullYear();
  const month = (getDate.getMonth() + 1).toString().padStart(2, '0');
  const day = getDate.getDate().toString().padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};
