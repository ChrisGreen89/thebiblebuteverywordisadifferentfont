import axios from 'axios';
axios.defaults.baseURL = "http://localhost:3000"

export const getVerse = async() => {
    const verse = await axios.get('/verse')
    return verse;
}

export const getFonts = async(limit = null) => {
    const fonts = await axios.get(`/fonts?limit=${limit}`)
    return fonts
}