import {projectFromMetadata} from "$lib/model/project";
import {blogFromMetadata} from "$lib/model/post";

export async function load() {
    const { metadata: projectMetadata } = await import(("$lib/projects/crete.md"))
    const { metadata: blogMetadata } = await import(("$lib/posts/ecs-serialisation.md"))

    const project = projectFromMetadata(projectMetadata)
    const blog = blogFromMetadata(blogMetadata)

    return {
        project,
        blog
    }
}