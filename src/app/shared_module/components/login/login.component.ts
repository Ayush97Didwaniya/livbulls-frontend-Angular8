import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService, AlertService } from 'src/app/_services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        public activeModal: NgbActiveModal,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            debugger;
            this.activeModal.close();
            if (this.authenticationService.currentUserValue.username === 'jitGirdhar') {
                this.router.navigate(['/home/admin']);
            } else {
                this.router.navigate(['/home']);
            }
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
        .pipe(first())
        .subscribe(
            data => {
                this.activeModal.close();
                console.log(this.returnUrl);
                if (this.authenticationService.currentUserValue.username === 'jitGirdhar') {
                    this.router.navigate(['/home/admin']);
                } else {
                    if (this.returnUrl !== '/') {
                        this.router.navigate([this.returnUrl]);
                    } else {
                        this.router.navigate(['/home']);
                    }
                }
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
}
}
