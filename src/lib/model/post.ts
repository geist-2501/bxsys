import { z } from "zod"

export interface Post {
    title: string;
    date: Date;
    description: string;
    slug: string;
}

const postSchema = z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    slug: z.string()
})

export function blogFromMetadata(metadata: unknown): Post | null {
    const result = postSchema.safeParse(metadata)
    if (result.success) {
        return {
            title: result.data.title,
            date: result.data.date,
            description: result.data.description,
            slug: result.data.slug,
        }
    } else {
        console.error(metadata)
        console.error("Could not parse blog: " + result.error)
        return null
    }
}