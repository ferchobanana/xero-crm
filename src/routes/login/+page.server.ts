import { redirect, type Actions } from "@sveltejs/kit";

export const load = (event) => {

    if(event.locals.user) {
        redirect(302, '/')
    }

}

export const actions = {
    default: (event) => {

        return {
            message: "succeed"
        }
    }
} satisfies Actions

