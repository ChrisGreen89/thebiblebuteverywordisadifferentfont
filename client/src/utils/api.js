import axios from 'axios';
axios.defaults.baseURL = process.env.VUE_APP_API_URL || process.env.API_URL || "https://thebiblebuteverywordisadifferentfont-api.azurewebsites.net"

export const getVerse = async(verse) => {
    return await axios.get(`/verse?verse=${verse}`)
}

export const getFonts = async(limit = null) => {
    const fonts = await axios.get(`/fonts?limit=${limit}`)
    return fonts
}