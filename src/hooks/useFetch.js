import { useState, useEffect, useRef } from "react";

export const useFetch = ({ url, opciones }) => {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(null)
  const [error, setError] = useState(null)

  const abortControllerRef = useRef(null)

  useEffect(() => {    
    abortControllerRef.current?.abort()
    abortControllerRef.current = new AbortController()

    const fetchData = async () => {
      setLoading(true)
      try {
        const response = opciones ?
          await fetch(url, opciones, { signal: abortControllerRef.current?.signal }) :
          await fetch(url, { signal: abortControllerRef.current?.signal })

        const data = await response.json()
        setData(data)

      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Fetch aborted')
          return
        }
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()    
  }, [])

  return { data, error, loading }
}