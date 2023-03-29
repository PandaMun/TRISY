// import styled from 'styled-components';
// import tw from 'twin.macro';
// import Slider from 'react-slick';
// import { GrFormNext, GrFormPrevious } from 'react-icons/gr';

// export default function ResultModal({ date, calender }) {
//   const orderedDate = calender?.data.sort((a, b) => new Date(a.evalDate) - new Date(b.evalDate));
//   let today = 0;
//   orderedDate?.forEach((el, idx) => {
//     if (el.evalDate === date) {
//       today = idx;
//     }
//   });
//   const settings = {
//     // dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: true,
//     initialSlide: today,
//     nextArrow: (
//       <S.Next>
//         <GrFormNext className='text-6xl absolute left-12 top-6' />
//       </S.Next>
//     ),
//     prevArrow: (
//       <S.Prev>
//         <GrFormPrevious className='text-6xl absolute right-12 top-6' />
//       </S.Prev>
//     ),
//   };
//   return (
//     <S.StyledSlider {...settings}>
//       {orderedDate &&
//         orderedDate.map((el, idx) => (
//           <div key={el.num}>
//             <S.MainSection>
//               <S.RatingSection>
//                 <S.InputBox>
//                   <S.Label htmlFor='수행능력'>
//                     <span>수행능력</span>
//                   </S.Label>
//                 </S.InputBox>

//                 <S.InputBox>
//                   <S.Label htmlFor='수업태도'>
//                     <span>수행태도</span>
//                   </S.Label>
//                 </S.InputBox>

//                 <S.InputBox>
//                   <S.Label htmlFor='수업집중도'>
//                     <span>수업집중도</span>
//                   </S.Label>
//                 </S.InputBox>
//               </S.RatingSection>
//               <S.CommentSection>
//                 <S.Label htmlFor='수업집중도'>
//                   <span>수업평</span>
//                 </S.Label>

//                 <S.Input value={el.comments} readOnly />
//               </S.CommentSection>
//             </S.MainSection>
//             <S.Footer>
//               {idx + 1}/{orderedDate.length}
//             </S.Footer>
//           </div>
//         ))}
//     </S.StyledSlider>
//   );
// }

// const S = {
//   Footer: styled.div`
//     ${tw`font-cafe24 text-2xl text-center pt-5`}
//   `,
//   MainSection: styled.div`
//     ${tw`grid grid-cols-2`}
//   `,
//   RatingSection: styled.div`
//     ${tw`col-span-1 flex flex-col justify-center items-center`}
//   `,
//   CommentSection: styled.div`
//     ${tw`col-span-1 flex flex-col justify-center items-center font-bold`}
//   `,
//   InputBox: styled.div`
//     ${tw`m-5 w-[300px] text-center`}
//   `,
//   Label: styled.label`
//     ${tw`font-cafe24 text-black rounded-lg w-[150px] text-xl text-center`}
//     span {
//       ${tw`text-brand font-bold text-2xl`}
//     }
//   `,
//   Input: styled.textarea`
//     ${tw`h-72 rounded-xl w-72 mt-3 focus:outline-brand border-2 border-black p-3 hover:cursor-default`}
//   `,
//   StyledSlider: styled(Slider)`
//     .slick-prev::before,
//     .slick-next::before {
//       opacity: 0;
//       display: none;
//     }
//   `,
//   Next: styled.div`
//     ${tw`w-20 h-20 text-black`}
//   `,
//   Prev: styled.div`
//     ${tw`w-20 h-20 text-black`}
//   `,
// };
