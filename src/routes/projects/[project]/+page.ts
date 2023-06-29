import type {PageLoadEvent} from "./$types"
import {error} from "@sveltejs/kit"

export async function load({params}: PageLoadEvent) {
    try {
        const project = await import((`../../../lib/projects/${params.project}.md`))
        return {
            project: project.default
        }
    } catch (err) {
        throw error(404)
    }
}