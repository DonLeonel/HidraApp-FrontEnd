import { useState } from "react"
import { ButtonAbonarTotal, ButtonCancelar, ButtonHacerEntrega } from "../buttons"

export const AbonoDeCuenta = () => {

    const [verInputEntrega, setVerInputEntrega] = useState(false)
    return (
        <>
            {!verInputEntrega &&
                <div className='contAbonarTotalHacerEntrega'>
                    <ButtonAbonarTotal />
                    <ButtonHacerEntrega
                        setVerInputEntrega={setVerInputEntrega}
                    />
                </div>
            }

            &&
            <div>
                <button
                    onClick={setVerInputEntrega(false)}
                >
                    Cancelar
                </button>
                <input
                    className='inputEntrega'
                    type="number"
                    placeholder='Ingrese monto'
                />
                <button>Entregar</button>
            </div>

        </>
    )
}