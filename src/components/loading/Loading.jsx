import '../../styles/components/loading/comun.css'
import { useRef } from 'react'
import { useEffect } from 'react'

export const Loading = ({ width, height, padding = null, margin = null }) => {

    const boxLoading = useRef();

    useEffect(() => {
        const setProperty = () => {
            const bL = boxLoading?.current
            if (bL) {
                bL.style.width = width;
                bL.style.height = height;
                if (padding) {
                    bL.style.padding = padding;
                }
                if (margin) {
                    bL.style.margin = margin;
                }
            }
        }
        setProperty()
    }, [width, height])

    return (
        <div
            className='aspecto'
            ref={boxLoading}
            id='boxLoading'>
        </div>
    )
}
