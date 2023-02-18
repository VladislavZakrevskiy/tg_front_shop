import axios from "axios";
import { Buffer } from "buffer";
import { useEffect, useState } from "react";

export const useImage = (id) => {
    const [screenShot, setScreenshot] = useState(undefined)
    const url = 'http://localhost:8000/images'

    useEffect(() => {
        let data = {
            id: id
        }
        async function fetchData() {
            const response = await axios.put(url,data, {
                headers: {
                    'Content-Type': 'application/json'
                },
                responseType:'arraybuffer'
            })
            let base64ImageString = Buffer.from(await response.data, 'binary').toString('base64')
            setScreenshot("data:image/png;base64," + base64ImageString)
        }
        fetchData();
    }, [id])

    return screenShot
}
