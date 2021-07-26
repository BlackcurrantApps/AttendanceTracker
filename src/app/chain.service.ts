import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ABI } from 'src/ABI';
import { environment } from 'src/environments/environment';

declare let Web3: any;
declare let window: any;
declare let ethereum: any;


@Injectable({
  providedIn: 'root'
})
export class ChainService implements OnInit{

  web3 = new Web3(Web3.givenProvider || "");
  EmployeeContract: any = null;

  public selectedAccount: string = "";
  public contractOwnerAddress: string = "";
  public selectedAccount$: Subject<string> = new Subject();
  public newLogAvailable$: Subject<any> = new Subject();
  public isWhiteListed = false;


  constructor() {
    this.ngOnInit();
  }

  async ngOnInit() {
    await this.askPermission();
    let accounts = await this.getAccounts();
    this.initAccount(accounts[0])

    window.ethereum.on('accountsChanged', async (accounts: Array<string>) => {
      console.log(`accountsChanged: ${accounts[0]}`)
      this.initAccount(accounts[0])
      await this.determineWhitelist(this.selectedAccount);
      this.selectedAccount$.next(accounts[0])
    });

    let ownerAddress = await this.EmployeeContract.methods.owner().call();
    this.contractOwnerAddress = ownerAddress;
    await this.determineWhitelist(this.selectedAccount);
    await this.getLogs(1)
  }

  private initAccount(address: string) {
    this.selectedAccount = address;
    this.web3.eth.defaultAccount = address
    this.EmployeeContract = new this.web3.eth.Contract(ABI.abiDefinition, environment.CONTRACT_ADDRESS, {
      from: this.web3.eth.defaultAccount
    });
  }

  private async askPermission() {
    if (window.ethereum) {
      await ethereum.enable();
    }
  }

  private async getAccounts() {
    return await this.web3.eth.getAccounts();
  }

  private async determineWhitelist(address: string) {
    let isWL = await this.EmployeeContract.methods.whitelist(address).call();
    this.isWhiteListed = isWL;
  }

  public async addEmployee(id: number, name: string, designation: string) {
    let result = await this.EmployeeContract.methods.addEmployee(id, name, designation).send();
    console.log(result);
    return result
  }

  public async checkInEmployee(id: number) {
    let result = await this.EmployeeContract.methods.recordAttendance(id, true).send();
    console.log(result);
    return result
  }

  public async checkOutEmployee(id: number) {
    let result = await this.EmployeeContract.methods.recordAttendance(id, false).send();
    console.log(result);
    return result
  }

  public async getLogs(id: number) {
    let events = await this.EmployeeContract.getPastEvents('AttendanceLog', {
      filter: {
        employeeId: id,
      },
      fromBlock: 0,
    })
    this.setupListener(id);
    return events;
  }

  private updateListener: any;

  public setupListener(id: number) {
    this.updateListener = this.EmployeeContract.events.AttendanceLog({
      filter: {
        employeeId: id,
      },
    })

    this.updateListener.on('data', (newLog: any)=> {
      this.newLogAvailable$.next(newLog);
    })

    this.updateListener.on('error', console.log)
  }

  public async getEmployee(id: number) {
    return await this.EmployeeContract.methods.employees(id).call();
  }
}
