import { PostView } from 'lemmy-js-client';

export function getLinksFromPost(post: PostView) {
  let links: string[] = [];

  if (post.post.url) {
    links = [post.post.url];
  }

  if (!post.post.body) {
    return links;
  }

  const regex = /!\[[^\]]*\]\((.*?)\s*("(?:.*[^"])")?\s*\)/g;
  const allLinks = [
    ...links,
    ...Array.from(post.post.body.matchAll(regex), (m) => m[1]),
  ];
  const deduplicatedLinks = new Set(allLinks);
  return Array.from(deduplicatedLinks);
}
