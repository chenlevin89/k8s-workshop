import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import {BehaviorSubject, lastValueFrom, zip, timer, scan, combineLatest, map} from 'rxjs';
import {TasksService} from '../../services/tasks.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  private tasksService = inject(TasksService);
  private $$tasksUpdated = new BehaviorSubject({});
  private tasksUpdated$ = this.createTasksUpdateObservable();

  protected tasks$ = this.createTasksObservable();

  ngOnInit() { }

  async onItemChecked({taskId, status}: {taskId: number, status: number}): Promise<void> {
    await lastValueFrom(zip(this.tasksService.update(taskId, status ? 0 : 1), timer(1000)));
    this.$$tasksUpdated.next({[taskId]: !status})
  }

  private createTasksUpdateObservable() {
    return this.$$tasksUpdated.asObservable()
      .pipe(
        scan((acc, curr) => ({...acc, ...curr}), {})
      );
  }

  private createTasksObservable() {
    return combineLatest([this.tasksService.get(), this.tasksUpdated$]).pipe(
      map(([tasks, updatedMapping]: any) => tasks.map((curr: any) => ({
        ...curr,
        Status: updatedMapping[curr.ID] ?? curr.Status
      }))
      ));
  }

}
