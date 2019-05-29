import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Injectable()
export class UtilService {
  constructor(private toastrService: ToastrService,
              private router: Router) {
  }

  createToastrSuccsess(message: string, title: string) {
    this.toastrService.success(message, title, {
      progressAnimation: 'increasing',
      progressBar: true,
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      closeButton: true,
      extendedTimeOut: 1000
    });
  }

  createToastrError(message: string, title: string) {
    this.toastrService.error(message, title, {
      progressAnimation: 'increasing',
      progressBar: true,
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      closeButton: true,
      extendedTimeOut: 10000
    });
  }
}
