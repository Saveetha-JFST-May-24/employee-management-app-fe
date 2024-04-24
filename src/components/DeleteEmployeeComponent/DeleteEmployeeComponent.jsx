import axios from 'axios'
import React, { useState } from 'react'

const DeleteEmployeeComponent = () => {
  const [employeeId, setEmployeeId] = useState('')
  const [employeeInfo, setEmployeeInfo] = useState({
    employeeName : '',
    employeeEmail:'',
    dateOfBirth: ''
})

const employeeIdHandler = (event) => {
  setEmployeeId(event.target.value)
}

const employeeNameHandler = (event) => {
  setEmployeeInfo({
      ...employeeInfo,
      employeeName : event.target.value
  })
}

const employeeEmailHandler = (event) => {
  setEmployeeInfo({
      ...employeeInfo,
      employeeEmail : event.target.value
  })
}

const dateOfBirthHandler = (event) => {
  setEmployeeInfo({
      ...employeeInfo,
      dateOfBirth : event.target.value
  })
}

const employeeIdValidator = (event) => {
  event.preventDefault()

  axios
    .get(`http://localhost:8080/api/v1/employee/${employeeId}`)
    .then(response => setEmployeeInfo(response.data))
    .catch(error => {
      alert(`Status ${error.response.data.status} - ${error.response.data.message}`)
  })
}

const formSubmitHandler = (event) => {
  event.preventDefault()
  axios
    .delete(`http://localhost:8080/api/v1/employee/${employeeId}`)
    .then (response => {
      if (response.status == 200)
      {
          alert(`Data of ${employeeInfo.employeeName} is added successfully`)
          window.location.href='/'
      }
  })
  .catch(error => {
      alert(`Status ${error.response.data.status} - ${error.response.data.message}`)
  })
}

const {employeeName, employeeEmail, dateOfBirth} = employeeInfo

  return (
    <form className="form-container" onSubmit={formSubmitHandler}>
      <div className="form-group">
        <label htmlFor="Employee ID">Employee ID</label>
        <input
          type='text'
          placeholder='Enter the employee ID'
          value = {employeeId}
          onChange={employeeIdHandler}
          required
          />
      </div>
      <div>
        <button onClick={employeeIdValidator}>Check</button>
      </div>

      <div className="form-group">
            <label htmlFor="Employee Name">Employee Name</label>
            <input 
                type='text'
                placeholder='Enter the employee name'
                value={employeeName}
                onChange={employeeNameHandler}
                required />
        </div>

        <div className="form-group">
            <label htmlFor="Employee Email">Employee Email</label>
            <input 
                type='text'
                placeholder='Enter the employee email'
                value={employeeEmail}
                onChange={employeeEmailHandler}
                required />
        </div>

        <div className="form-group">
            <label htmlFor="Date of Birth">Date of Birth</label>
            <input 
                type='date'
                value={dateOfBirth}
                onChange={dateOfBirthHandler}
                required />
        </div>

        <div>
            <button type='submit'>Delete</button>
        </div>
    </form>
  )
}

export default DeleteEmployeeComponent