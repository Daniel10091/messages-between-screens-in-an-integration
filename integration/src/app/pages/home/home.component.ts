import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IntegrationMessagesService } from 'src/app/services/integration-messages.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  value: string = '';
  isValidValue: boolean = true;
  
  msg: string = '';

  showPrescriptionIframe: boolean = false;
  
  constructor(
    public router: Router,
    private integrationMessages: IntegrationMessagesService
  ) { }

  ngOnInit(): void {
    this.integrationMessages.message$.subscribe(msg => {
      console.log('msg: ' + msg);
      
      this.msg = msg;
    });
  }

  sendMessage(): void {
    if (this.value !== '') {
      this.isValidValue = true;
      // window.parent.postMessage(this.value, '*');
      // this.prescriptionPage = this.router.navigate(['/prescricao']);
      // this.prescriptionPage.then(() => {
      //   this.integrationMessages.postMessage(this.value);
      // });

      // this.showPrescriptionIframe = true;
      
      this.integrationMessages.postMessage(this.value);
    } else {
      this.isValidValue = false;
    }
    // window.parent.postMessage('Mensagem enviada!', '*');
  }
  
  closePrescriptionIframe() {
    this.showPrescriptionIframe = false;
  }

}
