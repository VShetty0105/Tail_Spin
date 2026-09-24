/*
 * Publisher lookups used by Astro pages at build time.
 * These queries read the local SQLite database and return typed publisher records.
 */

import { asc } from 'drizzle-orm';
import type { Database } from './db';
import { publishers } from '../../db/schema';
import type { Publisher } from '../types/game';

/**
 * Fetch every publisher in alphabetical order.
 *
 * @param db - Drizzle database client configured for the local SQLite database.
 * @returns A list of publishers with their ids and names sorted by name.
 */
export async function getAllPublishers(db: Database): Promise<Publisher[]> {
    const rows = await db
        .select({
            id: publishers.id,
            name: publishers.name,
        })
        .from(publishers)
        .orderBy(asc(publishers.name));

    return rows;
}
