import React, { useState } from 'react'
import { useStudentContext } from '../context/StudentsProvider'

const Students = () => {
    const { student, error, loading, removeStudent, editStudent } = useStudentContext();
    const [editingId, setEditingId] = useState(null);
    const [editName, setEditName] = useState('');

    if (loading) return <div><h2>Is loading</h2></div>
    if (error) return <div><h2>خطا: {error}</h2></div>

    const handleDelete = (id) => {
        removeStudent(id);
    }

    const handleEditClick = (student) => {
        setEditingId(student.id);
        setEditName(student.name);
    }

    const handleEditChange = (e) => {
        setEditName(e.target.value);
    }

    const handleEditSave = async (id) => {
        await editStudent(id, { id, name: editName });
        setEditingId(null);
        setEditName('');
    }

    const handleEditCancel = () => {
        setEditingId(null);
        setEditName('');
    }

    return (
        <div className='bg-blue-50 p-5 rounded-lg'>
            <ul className='flex flex-col gap-2 h-[250px] overflow-y-scroll'>
                {student.map((student) => (
                    <li className='grid place-items-center grid-cols-4' key={student.id}>
                        <h2>{student.id}</h2>
                        {editingId === student.id ? (
                            <>
                                <input
                                    className='border-2 rounded-full text-center p-[1px]'
                                    value={editName}
                                    onChange={handleEditChange}
                                    type="text"
                                />
                                <button onClick={() => handleEditSave(student.id)} className='border-2 border-black flex justify-center items-center w-8 h-8 hover:text-white hover:bg-black rounded-full'>✔</button>
                                <button onClick={handleEditCancel} className='border-2 border-black flex justify-center items-center py-1 px-5 hover:text-white hover:bg-black rounded-full'>Cancel</button>
                            </>
                        ) : (
                            <>
                                <h2>{student.name}</h2>
                                <button onClick={() => handleDelete(student.id)} className='border-2 border-black flex justify-center items-center w-8 h-8 hover:text-white hover:bg-black rounded-full'>X</button>
                                <button onClick={() => handleEditClick(student)} className='border-2 border-black flex justify-center items-center py-1 px-5 hover:text-white hover:bg-black rounded-full'>Edit</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Students