import {projectFromMetadata} from "$lib/model/project";
import type {Markdown} from "$lib/model/markdown";

export async function load() {
    const projects = await Promise.all(
        Object.entries(import.meta.glob('$lib/projects/*.md')).map(async ([_, resolver]) => {
            const { metadata } = await resolver() as Markdown
            return projectFromMetadata(metadata)
        }))

    projects.filter(project => project !== null)

    return {
        projects: projects
    }
}