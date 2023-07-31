import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class MapperService {
  private readonly mappers: Record<string, (url: URL) => string> = {
    'youtu.be': (url: URL) => `https://youtube.com/embed/${url.pathname}`,
    'youtube.com': (url: URL) =>
      `${url.origin}/embed/${url.searchParams.get('v')}`,
    'xvideos.com': (url: URL) =>
      `${url.origin}/embedframe/${url.pathname
        .split('/')[0]
        .replace('video', '')}`,
    'redgifs.com': (url: URL) =>
      `${url.origin}${url.pathname.replace('/watch', '/ifr')}`,
    'v3.redgifs.com': (url: URL) =>
      `${url.origin}${url.pathname.replace('/watch', '/ifr')}`,
  };

  public constructor(private readonly sanitizer: DomSanitizer) {}

  public transformToEmbeddableSource(link: string) {
    const url = new URL(link);
    const mapper = this.mappers[url.host.replace('www.', '')];
    if (!mapper) {
      return;
    }

    return this.sanitizer.bypassSecurityTrustResourceUrl(mapper(url));
  }
}
