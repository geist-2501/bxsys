import type {PageLoadEvent} from "./$types"
import {error} from "@sveltejs/kit"
import type {Markdown} from "$lib/model/markdown";

export async function load({params}: PageLoadEvent) {
    try {
        const project = await import(`../../../lib/projects/${params.project}.md`) as Markdown
        return {
            project: project.default
        }
    } catch (err) {
        throw error(404)
    }
}