import React from 'react'
import '../../styles/pages/reportes.css'
import { NavMenuRep } from '../../components/index'
import { Outlet } from 'react-router-dom'

export const Reportes = () => {
    return (
        <>

            <section className='contReportes borLayout'>
                <h4 className='tituloLayout'> Reportes</h4>
                <NavMenuRep />
            </section>


            <Outlet />
        </>
    )
}
