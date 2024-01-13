import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IntegrationMessagesService {

  private _message$ = new Subject<string>();

  private evetListener: any = null;

  iframe: any = null;

  constructor() { }

  getMessage(event: any) {
    var parentWindow = event.source;
    var message = event.data;

    this._message$.next(message);

    // parentWindow.postMessage('Mensagem recebida!', '*');
  }

  get message$(): Observable<string> {
    return this._message$.asObservable();
  }

  postMessage(message: string) {
    this.iframe = window.open('http://localhost:57516/prescricao', '_blank');

    this.iframe.postMessage(message, '*');

    console.log('iframe: ' + this.iframe);
  }

  enviarMensagem() {
    var mensagem = "Olá, Janela 2!";
    window.opener.postMessage(mensagem, '*');
  }

  destroyEventListener() {
    window.removeEventListener('message', this.evetListener);
    this.evetListener = null;
  }

}
