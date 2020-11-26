import axios from "axios"
import { ipAddress } from "../constants/index"
import { parseJWT } from "../helpers"
class JwtToken {
  constructor(pushTo, setUser) {
    this.accessToken = localStorage.getItem("access-token")
    this.refreshToken = localStorage.getItem("refresh-token")
    this.pushTo = pushTo
    this.checkAuth()
    this.setUser = setUser
  }
  refreshIntervalObject = null
  refreshTimeout = 60000

  requestHeaders(accessToken) {
    axios.defaults.headers["access-token"] = `Bearer ${accessToken}`
  }

  resetTokens = () => {
    this.accessToken = null
    this.refreshToken = null
  }

  checkAuth = () => {
    if (!this.accessToken && !this.refreshToken) {
      this.pushTo("/sign-in")
    } else {
      axios.get(`${ipAddress}/auth/check`, {
        headers: {
          "access-token": `Bearer ${this.accessToken}`,
          "refresh-token": `Bearer ${this.refreshToken}`
        }
      }).then(response => {
        console.log('checkAuth', response.data)
        this.requestHeaders(this.accessToken)
        this.setUser(parseJWT(this.accessToken))
        this.refreshTokenWithInterval()
      }).catch(err => {
        // console.log('err', err.response.data)
        this.clearRefreshInterval()
        this.pushTo("/sign-in")
      })
    }
  }

  doRefreshToken = (refreshToken = this.refreshToken) => {
    axios.post(`${ipAddress}/auth/refresh-token`, {
      refreshToken: refreshToken
    }).then(response => {
      this.setTokens(response.data.accessToken, response.data.refreshToken)
      this.setUser(parseJWT(response.data.accessToken))
      this.requestHeaders(response.data.accessToken)
      console.log("Refreshed tokens", response.data);
    }).catch(() => {
      this.clearRefreshInterval()
      this.pushTo("/sign-in")
    })
  }

  refreshTokenWithInterval = (refreshToken) => {
    this.clearRefreshInterval()
    this.refreshIntervalObject = setInterval(() => {
      this.doRefreshToken(refreshToken)
    }, this.refreshTimeout)
  }

  clearRefreshInterval = () => {
    this.refreshIntervalObject && clearInterval(this.refreshIntervalObject)
  }

  setTokens(accessToken, refreshToken) {
    if (accessToken) {
      localStorage.setItem("access-token", accessToken)
      this.accessToken = accessToken
    }
    if (refreshToken) {
      localStorage.setItem("refresh-token", refreshToken)
      this.refreshToken = refreshToken
    }
  }
}

export default JwtToken