import z from 'zod'

const VerificarUsuario = z.object({
    _id: z.number(),
    nombre: z.string(),
    email: z.string().email({
        message: "Email no válido"
    }),
    telefono: z.string(),
    direccion: z.string()
})

export const validarUsuario = (usuario) => {
    return VerificarUsuario.safeParse(usuario);
}

export const validarUsuarioParcial = (usuario) => {
    return VerificarUsuario.partial().safeParse(usuario);
}