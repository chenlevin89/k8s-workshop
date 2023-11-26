import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SkeletonLoadingComponent} from './skeleton-loading.component';
import {SkeletonLoadingDirective} from './skeleton-loading.directive';
import {SkeletonLoaderIconComponent} from './skeleton-loader-icon.component';

@NgModule({
    declarations: [SkeletonLoadingComponent, SkeletonLoadingDirective, SkeletonLoaderIconComponent],
    imports: [CommonModule],
    exports: [SkeletonLoadingDirective]
})
export class SkeletonLoadingModule {}
