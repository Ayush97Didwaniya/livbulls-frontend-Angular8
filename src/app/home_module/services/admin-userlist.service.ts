import { Injectable, PipeTransform} from '@angular/core';
import { AdminUserList, AdminUserListAdapter } from '@app/home_module/models/adminUserList';
import { BehaviorSubject, Observable, of, Subject} from 'rxjs';
import { DecimalPipe} from '@angular/common';
import { debounceTime, delay, switchMap, tap, map} from 'rxjs/operators';
import { SortDirection} from '../directive/sortable.directive';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


interface SearchResult {
  adminUserList: AdminUserList[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: string;
  sortDirection: SortDirection;
}

// const Users: AdminUserList[] = [
//   {
//   id: 1,
//   firstName: 'Shubham',
//   lastName: 'Aggarwal',
//   email: 'shub.agg22@liv.com',
//   imageUrl: 'https://bootdey.com/img/Content/user_2.jpg'
// },
// {
//   id: 2,
//   firstName: 'aman',
//   lastName: 'Aggarwal',
//   email: 'shub.agg225@liv.com',
//   imageUrl: 'https://bootdey.com/img/Content/user_1.jpg'
// },
// {
//   id: 3,
//   firstName: 'Shubham',
//   lastName: 'jain',
//   email: 'shub.agg221@liv.com',
//   imageUrl: 'https://bootdey.com/img/Content/user_3.jpg'
// },
// {
//   id: 4,
//   firstName: 'kush',
//   lastName: 'Aggarwal',
//   email: 'shub.agg122@liv.com',
//   imageUrl: 'https://bootdey.com/img/Content/user_2.jpg'
// },
// {
//   id: 5,
//   firstName: 'Shubham',
//   lastName: 'gupta',
//   email: 'shub.agg202@liv.com',
//   imageUrl: 'https://bootdey.com/img/Content/user_1.jpg'
// },
// {
//   id: 6,
//   firstName: 'ankit',
//   lastName: 'Aggarwal',
//   email: 'shub.agg122@liv.com',
//   imageUrl: 'https://bootdey.com/img/Content/user_2.jpg'
// },
// {
//   id: 7,
//   firstName: 'Shubham',
//   lastName: 'goyal',
//   email: 'shub.agg2112@liv.com',
//   imageUrl: 'https://bootdey.com/img/Content/user_3.jpg'
// },
// {
//   id: 8,
//   firstName: 'aman',
//   lastName: 'jain',
//   email: 'shub.agg2112@liv.com',
//   imageUrl: 'https://bootdey.com/img/Content/user_1.jpg'
// }
// ];
 

function compare(v1, v2) {
  return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}

function sort(adminUserList: AdminUserList[], column: string, direction: string): AdminUserList[] {
  if (direction === '') {
    return adminUserList;
  } else {
    return [...adminUserList].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(adminUserList: AdminUserList, term: string, pipe: PipeTransform) {
  return adminUserList.firstName.toLowerCase().includes(term)
    || pipe.transform(adminUserList.lastName).includes(term) ;
}

@Injectable({providedIn: 'root'})
export class AdminUserListService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _adminUserList$ = new BehaviorSubject<AdminUserList[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(private pipe: DecimalPipe, private http: HttpClient,
    private adminUsers: AdminUserListAdapter) {
this.fetchUserList();
}

fetchUserList(){
  this.getAdmimUserList().subscribe(result => {
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
  getAdmimUserList() {
        return this.http.get<any>(`${environment.apiUrl}/users`).pipe(map(users => {
            return users.map(users => this.adminUsers.adapt(users));
        }));
    }
  // getAdmimUserList() {
  //   // return this.http.get<any>(`${environment.apiUrl}/api/termPlan`).pipe(map(termPlans => {
  //   //   return termPlans.map(termPlan => this.adminTermPlan.adapt(termPlan));
  //   // }));
  //   return Users;
  // }

}
