import axios from 'axios'
import { jwtToken } from '../components/routes/Routes'
import {ipAddress} from '../constants'
import { parseJWT }  from '../helpers'

class Auth {
    constructor() {
        this.isAuthenticated = false
    }

    login({login, password}, callback) {
        axios.post(`${ipAddress}/auth/login`, { username: login, password })
            .then(res => {
                console.log("entered then", res, res.data)
                localStorage.setItem("access-token", res.data.accessToken)
                localStorage.setItem("refresh-token", res.data.refreshToken)
                window.parsedToken = parseJWT(res.data.accessToken)
                callback(res.data.accessToken)
                this.isAuthenticated = true
                jwtToken.refreshTokenWithInterval(res.data.refreshToken)
                jwtToken.requestHeaders(res.data.accessToken)
            }).catch(error => {
                console.log("Failed to login!!", error)
            })
    }
}

export default new Auth()