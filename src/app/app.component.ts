import { environment } from 'src/environments/environment';
import { SwalHelper } from './swal-helper';
import { ChainService } from './chain.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public addEmployeeId: number = 1
  public addEmployeeName: string = ""
  public addEmployeeDesignation: string = ""
  public checkInOutEmployeeId: number = 1;
  public getLogsId: number = 1;
  public getEmployeeId: number = 1;
  public employee: any = null;
  public environment = environment;

  public logs: any[] = [];

  constructor(
    private changeDetector: ChangeDetectorRef,
    public chainService: ChainService,
  ) {
  }

  async ngOnInit() {
    this.chainService.selectedAccount$.pipe(

    ).subscribe(account => {
      this.changeDetector.detectChanges()
    })

    this.chainService.newLogAvailable$.subscribe(newLog => {
      this.logs.unshift(newLog)
    })
  }

  public addEmployee() {
    this.chainService.addEmployee(this.addEmployeeId, this.addEmployeeName, this.addEmployeeDesignation)
      .then(success => {
        SwalHelper.showSuccessSwal("Saved", `Txn Hash: ${success.transactionHash}`)
      })
      .catch(err => {
        SwalHelper.showErrorSwal(err.message)
      })
  }

  public checkIn() {
    this.chainService.checkInEmployee(this.checkInOutEmployeeId)
      .then(success => {
        SwalHelper.showSuccessSwal("Saved", `Txn Hash: ${success.transactionHash}`)
      })
      .catch(err => {
        SwalHelper.showErrorSwal(err.message)
      })
  }

  public checkOut() {
    this.chainService.checkOutEmployee(this.checkInOutEmployeeId)
      .then(success => {
        SwalHelper.showSuccessSwal("Saved", `Txn Hash: ${success.transactionHash}`)
      })
      .catch(err => {
        SwalHelper.showErrorSwal(err.message)
      })
  }

  public getLogs() {
    this.chainService.getLogs(this.getLogsId).then(logs => {
      this.logs = logs;
      this.logs.reverse()
    }).catch(err => {
      SwalHelper.showErrorSwal(err.message)
    })
  }

  public getEmployee(empId: number) {
    this.chainService.getEmployee(empId).then(emp => {
      this.employee = emp;
      console.log(this.employee)
    })
    .catch(err => {
      SwalHelper.showErrorSwal(err.message)
    })
  }


}
