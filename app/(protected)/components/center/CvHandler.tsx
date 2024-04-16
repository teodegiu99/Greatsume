"use client"
import { useSelector } from 'react-redux';
import { RootState } from '../../../state/store';


const CvHandler = () => {
    const object = useSelector((state: RootState) => state.updateValues);
    console.log('Contenuto di object:', object);

  return (
    <div className='text-center text-white text-3xl z-200'>
        <p>{object?.state?.skillss}</p>
        {object?.state?.bio}
      
    </div>
  )
}

export default CvHandler
