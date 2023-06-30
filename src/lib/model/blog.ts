import { z } from "zod"

export interface Blog {
    title: string;
    date: Date;
    description: string;
    slug: string;
}

const blogSchema = z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    slug: z.string()
})

export function blogFromMetadata(metadata: unknown): Blog | null {
    const result = blogSchema.safeParse(metadata)
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