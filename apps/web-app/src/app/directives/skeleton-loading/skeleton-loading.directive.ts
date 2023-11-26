import {ComponentRef, Directive, Input, OnChanges, TemplateRef, ViewContainerRef} from '@angular/core';
import {SkeletonLoadingComponent} from './skeleton-loading.component';

@Directive({
  selector: '[isSkeletonLoading]'
})
export class SkeletonLoadingDirective implements OnChanges {
  @Input('isSkeletonLoadingWidth')
  width!: string;
  @Input('isSkeletonLoadingHeight')
  height!: string;
  @Input('isSkeletonLoadingMargin')
  margin!: string;
  @Input('isSkeletonLoadingClassName')
  className!: string;
  @Input('isSkeletonLoadingHasBackground')
  hasBackground!: boolean;

  @Input('isSkeletonLoading') set loading(value: boolean) {
    this.setSkeleton(value);
  }

  private componentRef: ComponentRef<SkeletonLoadingComponent> | null = null;

  constructor(private templateRef: TemplateRef<any>, private vcr: ViewContainerRef) { }

  ngOnChanges() {
    if (this.componentRef) {
      Object.assign(this.componentRef.instance, {
        width: this.width,
        height: this.height,
        margin: this.margin,
        className: this.className,
        hasBackground: this.hasBackground
      });
    }
  }

  private setSkeleton(show: boolean) {
    this.vcr.clear();
    this.componentRef?.destroy();
    this.componentRef = null;

    if (show) {
      this.componentRef = this.vcr.createComponent(SkeletonLoadingComponent);
    } else {
      this.vcr.createEmbeddedView(this.templateRef);
    }
  }
}
