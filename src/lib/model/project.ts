import { z } from "zod"

export interface ProjectLink {
    displayName: string;
    link: string;
}

export interface Project {
    title: string;
    links: ProjectLink[];
    tags: string[];
    description: string;
    slug: string;
}

const projectSchema = z.object({
    title: z.string(),
    tags: z.array(z.string()),
    description: z.string(),
    slug: z.string(),
    links: z.record(z.string(), z.string())
})

function createLinks(linkMap: Record<string, string>): ProjectLink[] {
    const links: ProjectLink[] = []
    for (const [key, value] of Object.entries(linkMap)) {
        links.push({
            displayName: key,
            link: value
        })
    }

    return links;
}

export function projectFromMetadata(metadata: object) : Project | null {
    const result = projectSchema.safeParse(metadata)

    if (result.success) {
        return {
            title: result.data.title,
            tags: result.data.tags,
            description: result.data.description,
            slug: result.data.slug,
            links: createLinks(result.data.links)
        }
    } else {
        console.error("Could not parse project: " + result.error)
        return null
    }
}