import type {PageLoadEvent} from "./$types"
import {error} from '@sveltejs/kit'
import type {Markdown} from "$lib/model/markdown";
import type {Post} from "$lib/model/post";
import {blogFromMetadata} from "$lib/model/post";

export interface BlogPageData {
    post: Markdown;
    metadata: Post;
}

export async function load({params}: PageLoadEvent): Promise<BlogPageData> {
    let post: Markdown;
    try {
        post = await import(`../../../lib/posts/${params.post}.md`) as Markdown
    } catch (err) {
        throw error(404)
    }

    const metadata = blogFromMetadata(post.metadata)

    if (metadata == null) {
        throw error(500)
    }

    return {
        post: post.default,
        metadata: metadata
    }
}