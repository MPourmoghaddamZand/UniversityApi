import React, { useState } from 'react'
import { useStudentContext } from '../context/StudentsProvider';




const ManageStudent = () => {
    const { addStudent, error } = useStudentContext();
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name) {
            return alert('Enter Name')
        }
        addStudent({ name })
        setName('')
    }

    return (
        <div className='flex flex-col gap-5'>
            <input value={name} onChange={(e)=> setName(e.target.value)} type="text" className='border-2 rounded-full text-center p-[1px]' />
            <button onClick={handleSubmit} className='border-2 border-white py-2 px-5 rounded-full hover:bg-white text-white hover:text-black transition-all duration-200'>
                Add Student</button>
                {error && <span>{error}</span>}
        </div>
    )
}

export default ManageStudent