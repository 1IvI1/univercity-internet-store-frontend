import axios from "axios"
import { ipAddress } from "../../../constants"

export const getUniversities = async () => {
  return await axios.get(`${ipAddress}/university/universities`)
}

export const getFaculties = async (id) => {
  return await axios.get(`${ipAddress}/university/faculties/${id}`)
}

export const getGroups = async (id) => {
  return await axios.get(`${ipAddress}/university/groups/${id}`)
}