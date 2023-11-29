import { Component, OnDestroy, OnInit } from '@angular/core';
import { IntegrationMessagesService } from 'src/app/services/integration-messages.service';

@Component({
  selector: 'app-prescricao',
  templateUrl: './prescricao.component.html',
  styleUrls: ['./prescricao.component.scss']
})
export class PrescricaoComponent implements OnInit, OnDestroy {
  
  msg: string = '';

  transaction = null;

  constructor(private integrationMessages: IntegrationMessagesService) { }

  ngOnInit(): void {
    this.integrationMessages.message$.subscribe(msg => {
      console.log('msg: ' + msg);
      
      this.msg = msg;
    });
    // this.integrationMessages.getMessage();
  }

  ngOnDestroy(): void {
    this.integrationMessages.destroyEventListener();
  }

}
