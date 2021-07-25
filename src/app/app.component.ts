import { ChainService } from './chain.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'satma-tracability-frontend';

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
  }


}
