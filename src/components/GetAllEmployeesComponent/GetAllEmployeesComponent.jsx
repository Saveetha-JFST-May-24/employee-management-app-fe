import React, { useEffect, useState } from 'react'
import './GetAllEmployeesComponent.css'
import axios from 'axios'
import EmployeeComponent from './EmployeeComponent'

const GetAllEmployeesComponent = () => {

    const [employees, setEmployees] = useState([])

    useEffect(()=>{
        axios
        .get("http://localhost:8080/api/v1/employee/")
        .then(response => setEmployees(response.data))
        .catch(error => {
            alert(`Status ${error.response.data.status} - ${error.response.data.message}`)
        })
    },[])
  return (
    <div className="employees">
        {employees.map((employee, index)=>(
           <EmployeeComponent key={index} employee={employee}/> 
        ))}
    </div>
  )
}

export default GetAllEmployeesComponent