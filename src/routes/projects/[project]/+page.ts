import type {PageLoadEvent} from "./$types"
import {error} from "@sveltejs/kit"
import type {Markdown} from "$lib/model/markdown";
import {type Project, projectFromMetadata} from "$lib/model/project";

export interface ProjectPageData {
    project: any;
    metadata: Project;
}

export async function load({params}: PageLoadEvent): Promise<ProjectPageData> {
    let project: Markdown
    try {
        project = await import(`../../../lib/projects/${params.project}.md`) as Markdown
    } catch (err) {
        throw error(404)
    }

    const metadata = projectFromMetadata(project.metadata)

    if (metadata == null) {
        throw error(500)
    }

    return {
        project: project.default,
        metadata
    }
}