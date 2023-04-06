import { useDispatch } from 'react-redux';
import { setModalClose } from '../left/ScheduleSlice';
import { useNavigate } from 'react-router-dom';
export const ExitModal = () => {
  const dispatch = useDispatch();
  const moveToMP = () => {
    dispatch(setModalClose());
    navigate('/myinfo');
  };
  const navigate = useNavigate();
  return (
    <>
      <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
        <div className='relative w-auto my-6 mx-auto max-w-3xl'>
          {/*content*/}
          <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
            {/*header*/}
            <div className='flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t'>
              <h3 className='text-3xl font-semibold'>일정 생성 성공🥳</h3>
              <button
                className='p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                onClick={() => moveToMP}
              >
                <span className='bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none'>
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className='relative p-6 flex-auto'>
              <p className='my-4 text-slate-500 text-lg leading-relaxed'>
                일정이 성공적으로 생성되었습니다. 생성된 일정은 마이페이지에서 확인 가능합니다.
              </p>
            </div>
            {/*footer*/}
            <div className='flex items-center justify-end p-6  border-solid border-slate-200 rounded-b'>
              <button
                className='bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                type='button'
                onClick={moveToMP}
              >
                마이페이지로 이동
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
    </>
  );
};
