export const validarUsuario = ({ nombre = '', apellido = '', email = '', password = '', rePassword = '' }) => {
    const errors = []

    nombre.trim() === '' &&
        errors.push({ nombre: 'nombre', mensaje: 'El nombre no puede estar vacío.' })

    apellido.trim() === '' &&
        errors.push({ nombre: 'apellido', mensaje: 'El apellido no puede estar vacío.' })

    email.trim() === '' &&
        errors.push({ nombre: 'email', mensaje: 'El email no puede estar vacío.' })

    if (password.length < 8 || password.length > 20) {
        errors.push({ nombre: 'password', mensaje: 'La contraseña debe tener entre 8 y 20 caracteres.' })
    }

    password !== rePassword &&
        errors.push({ nombre: 'rePassword', mensaje: 'Las contraseñas no coinciden.' })

    return errors
}