import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SkeletonLoadingModule} from '../../directives/skeleton-loading/skeleton-loading.module';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    SkeletonLoadingModule
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent {
  @Input() list: any[] = [];
  @Output() itemChecked = new EventEmitter<{taskId: number, status: number}>();

  loadingMapping: {[key: number]: number} = {};

  onItemChecked(event: Event, task: any) {
    event.preventDefault();
    this.itemChecked.next({taskId: task.ID, status: task.Status});
    this.loadingMapping[task.ID] = task.Status;
  }
}
