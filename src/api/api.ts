import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:3333/api'
})

export const busca = async (url: string, setDado: any) => {
    const resposta = await api.get(url)
    setDado(resposta.data)
}

export const buscaPorId = async (url: string,id: any, setDado: any) => {
    const resposta = await api.get(`${url}/${id}`)
    setDado(resposta.data)
    return resposta
}

export const inserir = async (url: string, setDado: any) => {
    const body = {
        'modelo': setDado['modelo'],
        'marca': setDado['marca'],
        'ano': setDado['ano'],
        'valor': setDado['valor']
    }

    return await api.post(url, JSON.stringify(body), {headers: { 'accept': '*/*', 'content-type': 'application/json'}})
}

export const atualizar = async (url: string, setDado: any) => {
    console.log(setDado)
    const body = {
        'id': setDado['id'],
        'modelo': setDado['modelo'],
        'marca': setDado['marca'],
        'ano': setDado['ano'],
        'valor': setDado['valor']
    }
    return await api.post(url, JSON.stringify(body), {headers: { 'accept': '*/*', 'content-type': 'application/json'}})
}

export const remover = async (url: string, id: any) => {
    return await api.delete(`${url}/${id}`,{headers: { 'accept': '*/*', 'content-type': 'application/json'}})
}

