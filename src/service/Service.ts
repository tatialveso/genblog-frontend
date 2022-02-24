import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://generation-blog.herokuapp.com/'
})

export const register = async(url: any, datum: any, setData: any) => {
    const resp = await api.post(url, datum);
    setData(resp.data);
}

export const login = async(url: any, datum: any, setData: any) => {
    const resp = await api.post(url, datum);
    setData(resp.data.token);
}

/*  o header indica para o programa retornar o token do usuário autenticado,
    levando em consideração que quem solicitar essa rota já é um usuário autenticado */
export const search = async(url: any, setData: any, header: any) => {
    const resp = await api.get(url, header);
    setData(resp.data);
}

export const searchId = async(url: any, setData: any, header: any) => {
    const resp = await api.get(url, header);
    setData(resp.data);
}

export const post = async(url: any, datum: any, setData: any, header: any) => {
    const resp = await api.post(url, datum, header);
    setData(resp.data);
}

export const put = async(url: any, datum: any, setData: any, header: any) => {
    const resp = await api.put(url, datum, header);
    setData(resp.data);
}

export const deleteId = async(url: any, header: any) => {
    await api.delete(url, header);
}