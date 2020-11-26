import axios from "axios"
import { ipAddress } from "../constants"

export const getLastMessages = (userId) => {
  return axios.get(`${ipAddress}/message/last-message/user/${userId}`)
}