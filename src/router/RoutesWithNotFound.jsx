import { Routes, Route } from "react-router-dom"

export const RoutesWithNotFound = ({ children }) => {
    return (
        <Routes>
            {children}
            <Route path='*' element={<div>NOT FOUND</div>} />
        </Routes>
    )
}