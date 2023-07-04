import {blogFromMetadata} from "$lib/model/blog";
import type {Markdown} from "$lib/model/markdown";

export async function load() {
    const posts = await Promise.all(
        Object.entries(import.meta.glob('$lib/posts/*.md')).map(async ([_, resolver]) => {
            const { metadata } = await resolver() as Markdown
            return blogFromMetadata(metadata)
        }))

    posts.filter(post => post !== null)

    return {
        posts: posts
    }
}