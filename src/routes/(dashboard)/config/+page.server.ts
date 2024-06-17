import { fail, redirect } from '@sveltejs/kit'
import { db } from '$lib/server/db/db'
import { configsTable } from '$lib/server/db/schema.js'
import { eq } from 'drizzle-orm'

export async function load({ locals }) {

    if(!locals.user) {
        redirect(302, "/login")
    }

    try {
         const results = await db.select()
                                .from(configsTable)
                                .where(eq(configsTable.userId, locals.user.id))
                                .limit(1)

        return { config: results[0] }
    }
    catch {
        return fail(400, { config: {} })
    }

}

export const actions = {
    
    default: async ({ locals, request }) => {

        if(!locals.user) {
            return fail(400, { message: "No tienes acceso a esta ruta" })
        }

        const formData = await request.formData()
        const dataset_id = formData.get('dataset_id')
        const token = formData.get('token')
        
        if (typeof dataset_id !== "string" || dataset_id.length < 5) {
            return fail(400, { message: "Debes ingresar un ID válido"})
        }

        if (typeof token !== "string" || token.length < 10) {
            return fail(400, { message: "Debes ingresar un Token válido"})
        }

        try {
            await db.update(configsTable)
                    .set({ APIToken: token, datasetID: dataset_id })
                    .where(eq(configsTable.userId, locals.user.id))
        }
        catch {
            return fail(400, { message: "Hubo un error al guardar la información, intentalo nuevamente." })
        }

        return { message: "Configuracion guardada correctamente", status: 200 }

    }

}