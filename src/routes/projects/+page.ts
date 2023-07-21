import { type Project, projectFromMetadata} from "$lib/model/project";
import type {Markdown} from "$lib/model/markdown";

export interface ProjectsPageData {
    projects: Project[]
}

export async function load(): Promise<ProjectsPageData> {
    const projects = await Promise.all(
        Object.entries(import.meta.glob('$lib/projects/*.md')).map(async ([_, resolver]) => {
            const { metadata } = await resolver() as Markdown
            return projectFromMetadata(metadata)
        }))

    projects.filter(project => project !== null)
    const nonNullProjects = projects as Project[]

    return {
        projects: nonNullProjects
    }
}