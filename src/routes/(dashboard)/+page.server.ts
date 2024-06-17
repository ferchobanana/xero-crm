import { lucia } from '$lib/server/auth.js'
import { fail, redirect } from '@sveltejs/kit'
import { db } from "$lib/server/db/db"
import { configsTable, eventsTable } from '$lib/server/db/schema.js'
import { eq } from 'drizzle-orm'
import CryptoJS from 'crypto-js';

export const actions = {

    // Action para crear un nuevo evento
    createEvent: async ({ locals, request, fetch }) => {

        if (!locals.user) {
            redirect(302, '/login')
        }

        const formData = await request.formData()
        const name = formData.get('name')
        const number = formData.get('number')
        const email = formData.get('email')
        const country = formData.get('country')
        const eventType = formData.get('event-type')

        if (typeof name !== "string" || name.length == 0) {
            return fail(400, { message: "El nombre es obligatorio" })
        }

        if (typeof number !== "string" || number.length == 0) {
            return fail(400, { message: "El celular es obligatorio" })
        }

        if (typeof email !== "string") {
            return fail(400, { message: "El email debe ser una cadena de texto" })
        }

        if (typeof country !== "string" || country.length == 0) {
            return fail(400, { message: "El pais es obligatorio" })
        }

        if (typeof eventType !== "string" || eventType.length == 0) {
            return fail(400, { message: "El tipo de evento es obligatorio" })
        }
        
        let dataset_id = ""
        let api_token = ""

        // Obtenemos el ID del conjunto de anuncios y el token del usuario
        try {
            const result = await db.select()
                                    .from(configsTable)
                                    .where(eq(configsTable.userId, locals.user.id))

            dataset_id = result[0].datasetID
            api_token = result[0].APIToken
        }
        catch {
            return fail(400, { message: "No se pudo crear el evento, intentalo nuevamente."})
        }

        // Creamos el evento en el API graph de Meta
        try {
            const res = await fetch(`https://graph.facebook.com/v20.0/${dataset_id}/events?access_token=${api_token}`, {
                method: "POST",
                headers: {},
                body: ""
            })
            const json = await res.json()
        }
        catch {}

        // Guardamos el nuevo evento registrado en la DB
        try {

            const hashedName = CryptoJS.SHA256(name).toString(CryptoJS.enc.Hex)
            const hashedNumber = CryptoJS.SHA256(number).toString(CryptoJS.enc.Hex)
            const hashedCountry = CryptoJS.SHA256(country).toString(CryptoJS.enc.Hex)
            const unixTimestampInSeconds = Math.floor(Date.now() / 1000);

            const eventData = {
                "data": [
                    {
                        "event_name": eventType,
                        "event_time": unixTimestampInSeconds,
                        "action_source": "chat",
                        "user_data": {
                            "ph": [
                                hashedNumber
                            ],
                            "country": [
                                hashedCountry
                            ],
                            "fn": [
                                hashedName
                            ]
                        },
                        "custom_data": {
                            "currency": "USD",
                            "value": "142.52"
                        }
                    }
                ]
            }

            await db.insert(eventsTable).values({
                userId: locals.user.id,
                eventData: { name, number, email, country },
                type: eventType
            })
        }
        catch {
            return fail(400, { message: "El evento se envió exitosamente a facebook, pero tuvimos problmas para guardar, lo sentimos :("})
        }

        return { message: "El evento se creo exitosamente.", status: 200 }
    },

    // Action para hacer logout
    logout: async ({ locals, cookies }) => {
        if (!locals.session) {
            return fail(401)
        }

        await lucia.invalidateSession(locals.session.id)
        const sessionCookie = lucia.createBlankSessionCookie();
        cookies.set(sessionCookie.name, sessionCookie.value, {
            path: ".",
            ...sessionCookie.attributes
        });
        redirect(302, "/login");
    }

}