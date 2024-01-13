import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IntegrationMessagesService } from 'src/app/services/integration-messages.service';

import {
  CfmAmbiente, 
  CfmIntegracaoPrescricao, 
  CfmLocalAtendimento, 
  CfmMedicamento, 
  CfmPaciente,
  CfmTipoDocumento
} from "@conselho-federal-de-medicina/integracao-prescricao-cfm";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [IntegrationMessagesService]
})
export class HomeComponent implements OnInit {

  integracaoPrescricao = new CfmIntegracaoPrescricao(CfmAmbiente.SIMULACAO);
  
  private readonly instanceId?: number;
  public readonly idIframe?: any;
  public readonly nomePopup?: string;
  
  private iframe: HTMLIFrameElement | null = null;
  private popup: WindowProxy | null = null;
  private responseListener: EventListener | null = null;

  value: string = '';
  isValidValue: boolean = true;
  
  msg: string = '';

  showPrescriptionIframe: boolean = true;
  
  constructor(
    public router: Router,
    private integrationMessages: IntegrationMessagesService
  ) { }

  ngOnInit(): void {
    // this.integrationMessages.message$.subscribe(msg => {
    //   console.log('msg: ' + msg);
      
    //   this.msg = msg;
    // });
    // setTimeout(this.integrationMessages.enviarMensagem, 3000);
  }
  
  // async criarIframe(): Promise<any> {
  //   await this.integracaoPrescricao.criarIframe(CfmTipoDocumento.RECEITA_SIMPLES, 'divIframe');
  // }

  sendMessage(): void {
    this.criarIframe('divIframe');

    this.obterTargetWindow()?.postMessage('Olá, Janela 2!', '*');

    if (this.value !== '') {
      this.isValidValue = true;
      // window.parent.postMessage(this.value, '*');
      // this.prescriptionPage = this.router.navigate(['/prescricao']);
      // this.prescriptionPage.then(() => {
      //   this.integrationMessages.postMessage(this.value);
      // });

      // this.showPrescriptionIframe = true;
      
      this.integrationMessages.postMessage('Olá, Janela 2!');
      // this.integrationMessages.enviarMensagem();
    } else {
      this.isValidValue = false;
    }
    // window.parent.postMessage('Mensagem enviada!', '*');
  }
  
  closePrescriptionIframe() {
    this.showPrescriptionIframe = false;
  }


  criarIframe(idElementoPai: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.iframe) {
        // iframe já existe, destrói e recria
        this.destruirIframe();
      }
      let parent = document.getElementById(idElementoPai);
      if (!parent) {
        // elemento pai (onde o iframe seria inserido) não existe
        return reject(new Error("Não foi possível carrega a Prescrição Eletrônica do CFM. Motivo: elemento pai do iframe não encontrado; idElementoPai: " + idElementoPai));
      }
      // cria o iframe
      this.iframe = document.createElement('iframe');
      this.iframe.setAttribute('id', this.idIframe);
      this.iframe.setAttribute('width', '100%');
      this.iframe.setAttribute('height', '100%');
      this.iframe.setAttribute('frameborder', '0');
      this.iframe.setAttribute('src', `http://localhost:57516/prescricao`);
      // resolve a promise quando a janela terminar de carregar
      this.iframe.addEventListener('load', _event => {
        resolve();
      });
      // adiciona o iframe no DOM (vai iniciar o carregamento)
      parent.appendChild(this.iframe);
    });
  }

  destruirIframe() {
    if (this.iframe) {
      this.iframe.remove();
      this.iframe = null;
    }
    this.removeResponseListener();
  }

  obterTargetWindow(): Window | null {
    if (this.iframe) {
      return this.iframe.contentWindow;
    } else if (this.popup) {
      return this.popup;
    } else {
      return null;
    }
  }

  private removeResponseListener() {
    if (this.responseListener) {
      window.removeEventListener('message', this.responseListener);
      this.responseListener = null;
    }
  }

}
