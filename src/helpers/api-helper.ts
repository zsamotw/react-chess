import axios from 'axios'

const axios$ = axios.create({
  baseURL: 'http://chess-api-chess.herokuapp.com/api/v1/chess'
})

const makeApiPostRequest = (url: string) => (data: { from: string, to: string, game_id: string } | { game_id: string }) => {
  return axios$.request({
    method: 'post',
    url: url,
    data
  });
}

const makeApiGetRequest = () => (url: string) => {
  return axios$.request({
    method: 'get',
    url: url,
  });
}

export {
  makeApiGetRequest,
  makeApiPostRequest
}
