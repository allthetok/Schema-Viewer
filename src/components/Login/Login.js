import React, { useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import './Login.css'

export const Login = ({ setToken }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const changeForm = (event, type) => {
        switch (type) {
            case 'user':
                setUsername(event.target.value)
                break
            case 'pass': 
                setPassword(event.target.value)
                break
            default:
                return
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        axios.post("http://localhost:3001/login", {username, password} )
        .then(response => {
            const token = response.data
            setToken(token)
            console.log(token)
            alert("submitted")
            
        })
        .catch(err => {
            console.log(err)
        })
        setUsername('')
        setPassword('')
    }

    return (
        <div className="login-wrapper">
            <h1>Please Log In</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input type="text" onChange={(e) => changeForm(e, 'user')}/>
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={(e) => changeForm(e, 'pass')} />
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}