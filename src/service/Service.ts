import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://generation-blog.herokuapp.com/'
})

export const login = async(url: any, datum: any, setData: any) => {
    const resp = await api.post(url, datum)
    setData(resp.data)
}