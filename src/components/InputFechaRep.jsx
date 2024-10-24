import React from 'react'

export const InputFechaRep = ({ setFechaInput, fechaInput, fechaActual}) => {
    return (
        <div>
            <input
                name='fecha'
                type='date'
                value={fechaInput}
                max={fechaActual}
                onChange={(e) => setFechaInput(e.target.value)}
            />
        </div>
    )
}
