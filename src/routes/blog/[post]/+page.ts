import type {PageLoadEvent} from "./$types"
import { error } from '@sveltejs/kit'

export async function load({params}: PageLoadEvent) {
  try {
    const post = await import(`../${params.post}.md`)
    return {
      post: post.default
    }
  } catch (err) {
    throw error(404)
  }
}