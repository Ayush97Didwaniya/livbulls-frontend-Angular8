import { Injectable, PipeTransform} from '@angular/core';
import { BehaviorSubject, Observable, of, Subject} from 'rxjs';
import { DecimalPipe} from '@angular/common';
import { debounceTime, delay, switchMap, tap, map} from 'rxjs/operators';
import { AppInit } from '@app/core/adapter/services/app.init.service';
import { SortDirection } from '@app/livbulls_modules/home_module/directive/sortable.directive';

import { AdminUserDataService } from './admin-user-data.service';
import { UserLoginData } from '../models/user.modal';

interface SearchResult {
  adminUserList: UserLoginData[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: string;
  sortDirection: SortDirection;
}

function compare(v1, v2) {
  return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}

function sort(adminUserList: UserLoginData[], column: string, direction: string): UserLoginData[] {
  if (direction === '') {
    return adminUserList;
  } else {
    return [...adminUserList].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(adminUserList: UserLoginData, term: string, pipe: PipeTransform) {
  return adminUserList.firstName.toLowerCase().includes(term)
    || pipe.transform(adminUserList.lastName).includes(term) ;
}

@Injectable({providedIn: 'root'})
export class AdminUserSharedService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _adminUserList$ = new BehaviorSubject<UserLoginData[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  private API_BASE_URL = AppInit.settings.apiServer.base_url_backend;
  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(private pipe: DecimalPipe,
              private userDataService: AdminUserDataService) {  
    this.fetchUserList();
  }

  fetchUserList(){
    this.userDataService.getAllUserData().subscribe(result => {
      const res = result;
        this._search$.pipe(
          tap(() => this._loading$.next(true)),
          debounceTime(200),
          switchMap(() => this._search(res)),
          delay(200),
          tap(() => this._loading$.next(false))
        ).subscribe(result => {
          this._adminUserList$.next(result.adminUserList);
          this._total$.next(result.total);
        });
        this._search$.next();
      }, error => {
        console.error('error coming');
      });
    console.log(this._adminUserList$);
    }

    get adminUserList$() { return this._adminUserList$.asObservable(); }
    get total$() { return this._total$.asObservable(); }
    get loading$() { return this._loading$.asObservable(); }
    get page() { return this._state.page; }
    get pageSize() { return this._state.pageSize; }
    get searchTerm() { return this._state.searchTerm; }

    set page(page: number) { this._set({page}); }
    set pageSize(pageSize: number) { this._set({pageSize}); }
    set searchTerm(searchTerm: string) { this._set({searchTerm}); }
    set sortColumn(sortColumn: string) { this._set({sortColumn}); }
    set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

    private _set(patch: Partial<State>) {
      Object.assign(this._state, patch);
      this._search$.next();
    }

    private _search(result): Observable<SearchResult> {
      const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

      // 1. sort
      let adminUserList = sort(result, sortColumn, sortDirection);

      // 2. filter
      adminUserList = adminUserList.filter(adminUserList => matches(adminUserList, searchTerm, this.pipe));
      const total = adminUserList.length;

      // 3. paginate
      adminUserList = adminUserList.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
      return of({adminUserList, total});
    }
  }
