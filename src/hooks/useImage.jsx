import axios from "axios";
import { Buffer } from "buffer";
import { useEffect, useState } from "react";

export const useImage = (id) => {
    const [screenShot, setScreenshot] = useState(undefined)
    const url = 'http://45.140.178.84:8000/images/' + id
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json'
                },
                responseType:'arraybuffer'
            })
            setIsLoading(false)
            let base64ImageString = Buffer.from(await response.data, 'binary').toString('base64')
            setScreenshot("data:image/png;base64," + base64ImageString)
        }
        fetchData();
    }, [id, url])

    return [screenShot, isLoading]
}
