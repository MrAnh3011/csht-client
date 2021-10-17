import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import * as groupAction from './group.action';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { GroupService } from '../../../component/group/group.service';
import { Group, Pagination } from '../../models/group.class';

@Injectable()
export class GroupEffects {
  constructor(
    private actions$: Actions,
    private groupService: GroupService,
  ) {
  }

  @Effect()
  loadGroups$: Observable<Action> = this.actions$.pipe(
    ofType<groupAction.GetGroupLoad>(
      groupAction.GroupAction.GetGroupLoad
    ),
    map((action: groupAction.GetGroupLoad) => action.pagination),
    mergeMap((page: Pagination) =>
      this.groupService.getGroup('').pipe(
        map(
          (data: {
            totalElements: number;
            content: Group[]
          }) =>
            new groupAction.GetGroupSuccess(data.content, data.totalElements)
        ),
        catchError(err => of(new groupAction.GetGroupFail(err)))
      )
    )
  );
  @Effect()
  deleteGroup$: Observable<Action> = this.actions$.pipe(
    ofType<groupAction.DeleteGroup>(
      groupAction.GroupAction.DeleteGroup
    ),
    map((action: groupAction.DeleteGroup) => action.id),
    mergeMap((id: number[]) =>
      this.groupService.deleteGroup(id).pipe(
        map(() => new groupAction.DeleteGroupSuccess(id))
        ,
        catchError(err => of(new groupAction.DeleteGroupFail(err)))
      ),
    )
  );
  @Effect()
  addGroup$: Observable<Action> = this.actions$.pipe(
    ofType<groupAction.AddGroup>(groupAction.GroupAction.AddGroup),
    map((action: groupAction.AddGroup) => action.group),
    mergeMap((group: Group) =>
      this.groupService.addGroup(group).pipe(map((groupNew: Group) => new groupAction.AddGroupSuccess(groupNew)),
        catchError(err => of(new groupAction.AddGroupFail(err)))
      ),
    )
  );
  @Effect()
  editGroup$: Observable<Action> = this.actions$.pipe(
    ofType<groupAction.UpdateGroup>(groupAction.GroupAction.UpdateGroup),
    map((action: groupAction.UpdateGroup) => action.group),
    mergeMap((group: Group) =>
      this.groupService.updateGroup(group).pipe(map(() =>
        new groupAction.UpdateGroupSuccess({ id: group.groupId, changes: group })),
        catchError(err => of(new groupAction.DeleteGroupFail(err)))
      ),
    )
  );
}
