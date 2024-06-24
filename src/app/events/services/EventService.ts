import axios from 'axios'
import { ApiBaseService } from '@/app/shared/services/ApiBaseService'
import type { EventModel } from '../models/EventModel'
import type { UserResponse } from '@/app/user/models/UserResponse'

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL

class EventService extends ApiBaseService<EventModel> {
    constructor() {
      super('/events')
    }
  
    async getEventsByUserId(userId: string) {
      return axios.get<EventModel[]>(`${API_BASE_URL}/events/user/${userId}`)
    }
  
    async getUserByEmail(email: string) {
      return axios.get<UserResponse>(`${API_BASE_URL}/users/email/${email}`)
    }
  }

export default new EventService()
