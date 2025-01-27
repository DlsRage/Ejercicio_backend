import zod from "zod";

const VerificarCliente = zod.object({
    id: zod.number(),
    nombre: zod.string(),
    puesto: zod.enum(["Gerente", "Desarrollador", "Analista", "Diseñador", "Soporte Técnico"]),
    email: zod.string().email({
        message: "Email no válido"
    }),
    telefono: zod.string(),
})

export const validarCliente = (cliente) => {    
    return VerificarCliente.safeParse(cliente);
}

export const validarClienteParcial = (cliente) => {
    return VerificarCliente.partial().safeParse(cliente);
}