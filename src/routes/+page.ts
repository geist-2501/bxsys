import {projectFromMetadata} from "$lib/model/project";
import {blogFromMetadata} from "$lib/model/blog";

export async function load() {
    const { metadata: projectMetadata } = await import(("$lib/projects/crete.md"))
    const { metadata: blogMetadata } = await import(("$lib/posts/out-with-the-old.md"))

    const project = projectFromMetadata(projectMetadata)
    const blog = blogFromMetadata(blogMetadata)

    return {
        project,
        blog
    }
}