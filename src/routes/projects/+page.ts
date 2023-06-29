import type {Project, ProjectFrontmatter, ProjectLink} from "$lib/model/project";

function createLinks(meta: any): ProjectLink[] {
    const links: ProjectLink[] = []
    if ("github" in meta) {
        links.push({
            displayName: "github",
            link: meta["github"]
        })
    }

    return links
}

export async function load() {
    const projects = await Promise.all(
        Object.entries(import.meta.glob('$lib/projects/*.md')).map(async ([path, resolver]) => {
            const resolved: any = await resolver()
            const metadata = resolved.metadata as ProjectFrontmatter
            const slug = path.split('/').pop()?.slice(0, -3)

            const project: Project = {
                title: metadata.title,
                tags: metadata.tags,
                description: metadata.description,
                slug: slug ?? "no-slug",
                links: createLinks(metadata)
            }

            return project
        }))

    return {
        projects: projects
    }
}