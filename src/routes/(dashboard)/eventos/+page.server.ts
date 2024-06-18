import { redirect } from '@sveltejs/kit';
import { db } from "$lib/server/db/db"
import { eventsTable } from '$lib/server/db/schema';
import { sql, eq, desc, count } from 'drizzle-orm';

export async function load({ locals, url }) {
    if(!locals.user) {
        redirect(302, '/login')
    }

    const pageParam = url.searchParams.get('p')
    let page: number = 1

    if (pageParam && typeof pageParam === "string") {
        page = parseInt(pageParam)
    }

    const el = 2
    const offset = (page * el) - el

    const totalEvents = await db.select({ count: count() })
                                .from(eventsTable)
                                .where(eq(eventsTable.userId, locals.user.id))

    const events = await db.select({
                                id: eventsTable.id,
                                event: eventsTable.eventData,
                                type: eventsTable.type
                            })
                            .from(eventsTable)
                            .where(eq(eventsTable.userId, locals.user.id))
                            .offset(offset)
                            .limit(el)
                            .orderBy(desc(eventsTable.createtAt))

    return { events, count: totalEvents[0].count, pageLimit: el }
}