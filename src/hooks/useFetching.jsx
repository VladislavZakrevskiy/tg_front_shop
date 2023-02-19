import { useState } from "react"

const useFetching = (callback) => {
    const [isLoading, setIsLoading]=useState(false)
    const [error] = useState('')

    const fetching =async(...args)=>{
        try {
            setIsLoading(true)
            await callback(...args)
        } catch (e) {
            console.log(e.message)
        } finally {
            setIsLoading(false)
        }
    }

    return [fetching, isLoading, error]
}

export default useFetching