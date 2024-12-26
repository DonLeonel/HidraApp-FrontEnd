export const validarLogin = ({ email, password }) => {
    const errors = []

    if ((password.length < 8 || password.length > 20) || (email.trim() === '')) {
        errors.push({ nombre: 'login', mensaje: 'El Email o la Contraseña son incorrectos.' })
    }

    return errors
}