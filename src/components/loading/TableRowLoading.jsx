import { useEffect } from "react"
import { Loading } from "./Loading"
import { useState } from "react"

export const TableRowLoading = ({ cantFilas, cantTd, props = null }) => {
    const [rows, setRows] = useState(['']);
    const [td, setTd] = useState(['']);

    useEffect(() => {
        setRows(Array.from({ length: cantFilas }))
        setTd(Array.from({ length: cantTd }))
    }, [cantFilas, cantTd])

    return (
        rows.map((_, index) => (
            <tr key={index}>
                {td.map((_, indexTd) =>
                    <td key={indexTd}>
                        <Loading
                            width={props?.width || '100%'}
                            height={props?.height || '15px'}
                            margin={props?.margin ||'4px'}
                        />
                    </td>
                )}
            </tr>
        ))
    )
}
