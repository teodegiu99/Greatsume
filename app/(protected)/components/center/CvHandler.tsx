"use client"
import { useSelector } from 'react-redux';
import { RootState } from '@/app/state/store';

const CvHandler = () => {
    const object = useSelector((state: RootState) => state.updateValues);
    console.log('Contenuto di object:', object);

  return (
    <div className='h-full flex justify-center items-center'>
        {/* <p>{object.state?.skillss}</p>
        {object.state?.bio} */}

        <div className='a4'>

        </div>
      
    </div>
  )
}

export default CvHandler
