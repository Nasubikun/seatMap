import { useCallback } from "react"
const useIncrement = (setValue,diff) =>{
    const func = useCallback(() => {
        setValue(prev => prev + diff)
      },[])

    return func
}

export default useIncrement;