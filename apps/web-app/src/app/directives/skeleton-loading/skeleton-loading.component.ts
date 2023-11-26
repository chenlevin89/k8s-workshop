import {Component, ElementRef, Input, OnInit, ChangeDetectionStrategy, Renderer2, NgZone} from '@angular/core';

@Component({
  selector: 'is-skeleton-loading',
  template: '<is-skeleton-loader-icon *ngIf="hasBackground"></is-skeleton-loader-icon>',
  styleUrls: ['./skeleton-loading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkeletonLoadingComponent implements OnInit {
  @Input()
  width!: string;
  @Input()
  height!: string;
  @Input()
  margin!: string;
  @Input()
  className!: string;
  @Input()
  hasBackground!: boolean;

  constructor(private elementRef: ElementRef<HTMLElement>, private renderer: Renderer2) { }

  ngOnInit() {
    const host = this.elementRef.nativeElement;

    if (this.className) {
      this.renderer.addClass(host, this.className);
    }

    host.style.setProperty('--skeleton-width', this.width ?? '100%');
    host.style.setProperty('--skeleton-height', this.height ?? '100%');
    host.style.setProperty('--skeleton-margin', this.margin ?? '0');
  }
}
