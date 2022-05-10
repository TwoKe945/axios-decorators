import { useHttpDecorators } from './src'
import axios from 'axios'

const http = axios.create({
  baseURL: 'http://127.0.0.1:4523/mock/673983',
})

const { GET, defaultResult } = useHttpDecorators(http)


class UserService {

  @GET((id: any) => `/one/user/${id}`)
  getUserById(id: number) { return defaultResult() }

}


new UserService().getUserById(1).then(console.log)
