import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumPostsPipe } from '../album-posts.pipe';
import { PostView } from 'lemmy-js-client';
import { getLinksFromPost } from '../helpers';
import { ActionEvent, KeyboardService } from '../services/keyboard.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MapperService } from '../services/mapper.service';

enum LinkType {
  Image,
  Video,
  Frame,
}

interface Link {
  type: LinkType;
  src: string | SafeResourceUrl;
}

@Component({
  selector: 'app-post-view',
  standalone: true,
  imports: [CommonModule, AlbumPostsPipe],
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.scss'],
})
export class PostViewComponent implements OnInit, OnChanges {
  private readonly VIDEO_FILE_TYPES = [
    'mp4',
    'mov',
    'wmv',
    'avi',
    'mk4',
    'webm',
  ];

  @Input() post: PostView | null = null;

  @Output() navigate: EventEmitter<number> = new EventEmitter();
  @Output() savePost: EventEmitter<PostView> = new EventEmitter();
  @Output() blockActor: EventEmitter<string> = new EventEmitter();

  public availableLinks: Link[] = [];
  public albumIndex = 0;

  public constructor(
    private readonly keyboard: KeyboardService,
    private readonly sanitizer: DomSanitizer,
    private readonly mapper: MapperService
  ) {}

  public ngOnInit() {
    this.keyboard.postNavigation$.subscribe((direction) => {
      this.navigate.next(direction);
    });

    this.keyboard.albumNavigation$.subscribe((direction) => {
      const nextIndex = this.albumIndex + direction;

      if (nextIndex === this.availableLinks.length || nextIndex === -1) {
        this.navigate.next(direction);
      } else {
        this.albumIndex = nextIndex;
      }
    });

    this.keyboard.onAction(ActionEvent.PostSave).subscribe(() => {
      if (this.post) {
        this.savePost.next(this.post);
      }
    });

    this.keyboard.onAction(ActionEvent.BlockActor).subscribe(() => {
      if (this.post) {
        this.blockActor.next(this.post.creator.actor_id);
      }
    });
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (this.post) {
      this.availableLinks = this.getTypedLinksFromPost(this.post);
      this.albumIndex = 0;
    }
  }

  public isVideo(link: string) {
    const fileType = link.split('.').reverse()[0];
    return this.VIDEO_FILE_TYPES.includes(fileType);
  }

  private getTypedLinksFromPost(post: PostView): Link[] {
    const links = getLinksFromPost(post);
    return links.map((link: string): Link => {
      // Check if there's a mapper registered for the url
      const mapResult = this.mapper.transformToEmbeddableSource(link);
      if (mapResult) {
        return {
          type: LinkType.Frame,
          src: mapResult,
        };
      }

      if (this.isVideo(link)) {
        return {
          type: LinkType.Video,
          src: link,
        };
      }

      return {
        type: LinkType.Image,
        src: link,
      };
    });
  }

  protected readonly LinkType = LinkType;
}
