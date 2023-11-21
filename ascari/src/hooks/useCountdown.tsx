/**
 * 
 * @param initialTime inital countdown timer in ms
 * @param callback executed when timer reaches 0
 */

import { useEffect, useState } from "react"

export const useCountdown = (endTime: number, callback: () => void, interval = 1000) => {    
    const starter = Date.now()
    const [time, setTime] = useState(endTime)

    useEffect(()=> {
        const customInterval = setInterval(()=> {
            if(time>0) {
                setTime((prev) => prev - interval)
            }
        }, interval)

        if(time===0) callback()
        return () => clearInterval(customInterval)

    },[time])

    return time
}

