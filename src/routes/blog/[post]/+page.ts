import type {PageLoadEvent} from "./$types"
import { error } from '@sveltejs/kit'
import type {Markdown} from "$lib/model/markdown";

export async function load({params}: PageLoadEvent) {
  try {
    const post = await import(`../../../lib/posts/${params.post}.md`) as Markdown
    return {
      post: post.default
    }
  } catch (err) {
    throw error(404)
  }
}