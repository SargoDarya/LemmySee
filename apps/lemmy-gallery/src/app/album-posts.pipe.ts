import { Pipe, PipeTransform } from '@angular/core';
import { PostView } from 'lemmy-js-client';
import { getLinksFromPost } from './helpers';

@Pipe({
  name: 'albumPosts',
  standalone: true,
})
export class AlbumPostsPipe implements PipeTransform {
  transform(post: PostView): string[] {
    return getLinksFromPost(post);
  }
}
