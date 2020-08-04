import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/_services';

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
    public navigateToPath = '';

    constructor(
        public activeModal: NgbActiveModal,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private authenticationService: AuthenticationService,
    ) {
    }

    ngOnInit() {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            console.log(this.navigateToPath);
            if (this.authenticationService.currentUserValue.username === 'jitGirdhar') {
                this.navigateToPath = '/home/admin';
            } else {
                this.navigateToPath = '/home';
            }
            // set time out included to remove view Ref Change Detection error
            setTimeout(() => {
                this.activeModal.close(this.navigateToPath);
            }, 0);
        }
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
                console.log(this.returnUrl);
                if (this.authenticationService.currentUserValue.username === 'jitGirdhar') {
                        this.navigateToPath = '/home/admin';
                } else {
                    if (this.returnUrl !== '/') {
                        this.navigateToPath = this.returnUrl;
                    } else {
                        this.navigateToPath = '/home';
                    }
                }
                setTimeout(() => {
                    this.activeModal.close(this.navigateToPath);
                }, 0);
            },
            error => {
                this.loading = false;
            });
    }

    ngOnDestroy() {
    }
}
