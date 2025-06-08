import React, { createContext, useContext, useEffect, useState } from 'react'



const StudentsContext = createContext();
const StudentsProvider = ({ children }) => {
  const API_URL = "http://localhost:5016/api/students"
  const [student, setStudent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();


  const addStudent = async (newStudent) => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newStudent)
      });

      if (!res.ok) throw new Error('Failed to add student');

      const addedStudent = await res.json();

      // آپدیت لیست استیت با دانشجوی جدید
      setStudent(prev => [...prev, addedStudent]);
    } catch (error) {
      setError(error.message);
    }
  };

  const removeStudent = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete student');

      setStudent(prev => prev.filter(student => student.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  const editStudent = async (id, updatedStudent) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedStudent)
      });

      if (!res.ok) throw new Error('Failed to update student');

      let editedStudent = updatedStudent;
      // Only parse JSON if response has content
      if (res.status !== 204) {
        editedStudent = await res.json();
      }

      setStudent(prev =>
        prev.map(student =>
          student.id === id ? editedStudent : student
        )
      );
    } catch (error) {
      setError(error.message);
    }
  }

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await fetch(API_URL)
        if (!res.ok) throw new Error("Can't catch Data")
        const data = await res.json()
        setStudent(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchStudent();
  }, [])
  return (
    <StudentsContext.Provider
      value={{ student, loading, error, addStudent, removeStudent, editStudent }}
    >
      {children}
    </StudentsContext.Provider>

  )
}

export const useStudentContext = () => useContext(StudentsContext);
export default StudentsProvider;