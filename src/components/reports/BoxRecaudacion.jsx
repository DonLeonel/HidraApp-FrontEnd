import '../../styles/components/report/boxRecaudacion.css'

export const BoxRecaudacion = ({nombre, total}) => {
    return (
        <div className='contBoxRecaudacion'>
            <h5>{nombre}</h5>
            <div>
                {total}
            </div>
        </div>
    )
}
