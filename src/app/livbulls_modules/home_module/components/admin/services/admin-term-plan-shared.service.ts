import { Injectable, PipeTransform} from '@angular/core';

import { BehaviorSubject, Observable, of, Subject} from 'rxjs';
import { DecimalPipe} from '@angular/common';
import { debounceTime, delay, switchMap, tap, map} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AdminTermPlanDataService } from './admin-term-plan-data.service';
import { AdminTermPlan } from '../modals/adminTermPlan.modal';
import { SortDirection } from '@app/livbulls_modules/home_module/directive/sortable.directive';

interface SearchResult {
  adminTermPlans: AdminTermPlan[];
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

function sort(adminTermPlan: AdminTermPlan[], column: string, direction: string): AdminTermPlan[] {
  if (direction === '') {
    return adminTermPlan;
  } else {
    return [...adminTermPlan].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(adminTermPlan: AdminTermPlan, term: string, pipe: PipeTransform) {
  return adminTermPlan.description.toLowerCase().includes(term.toLowerCase())
    || adminTermPlan.planName.toLowerCase().includes(term.toLowerCase());
}

@Injectable({providedIn: 'root'})
export class AdminTermPlanSharedService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _adminTermPlan$ = new BehaviorSubject<AdminTermPlan[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(private pipe: DecimalPipe, private http: HttpClient,
              private termPlanDataService: AdminTermPlanDataService) {
    this.fetchTermPlan();
  }

  fetchTermPlan() {
    this.termPlanDataService.getAdmimTermPlan().subscribe(result => {
      const res = result;
      this._search$.pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(200),
        switchMap(() => this._search(res)),
        delay(200),
        tap(() => this._loading$.next(false))
      ).subscribe(result => {
        this._adminTermPlan$.next(result.adminTermPlans);
        this._total$.next(result.total);
      });
      this._search$.next();
    }, error => {
      console.error('error coming');
    });
  }

  get adminTermPlans$() { return this._adminTermPlan$.asObservable(); }
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
    let adminTermPlans = sort(result, sortColumn, sortDirection);

    // 2. filter
    adminTermPlans = adminTermPlans.filter(termPlan => matches(termPlan, searchTerm, this.pipe));
    const total = adminTermPlans.length;

    // 3. paginate
    adminTermPlans = adminTermPlans.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({adminTermPlans, total});
  }
}
