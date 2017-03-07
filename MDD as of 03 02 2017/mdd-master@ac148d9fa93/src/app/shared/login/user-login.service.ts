import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
//In order to run locally please create mashup.config.ts by copying mashup.dev.config.ts or other configs
import {HOST} from "../mashup.config";

@Injectable()
export class UserLoginService {

  constructor(private http: Http) {
  }

  doLogin(userName, password) {
    let xmlData =
      "xmlData=<auth:credentials xmlns:auth='http://developer.cognos.com/schemas/ccs/auth/types/1'>"
      + "<auth:credentialElements><auth:name>CAMNamespace</auth:name>"
      + "<auth:value><auth:actualValue>Cognos_LDAP</auth:actualValue></auth:value></auth:credentialElements>"
      + "<auth:credentialElements><auth:name>CAMUsername</auth:name>"
      + "<auth:value><auth:actualValue>"+ userName +"</auth:actualValue></auth:value></auth:credentialElements>"
      + "<auth:credentialElements><auth:name>CAMPassword</auth:name>"
      + "<auth:value><auth:actualValue>"+ password +"</auth:actualValue></auth:value></auth:credentialElements>"
      + "</auth:credentials>";
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(
      HOST + "/rds/auth/logon",
      xmlData,
      {
        headers: headers,
        withCredentials: true
      }
    );
  }

  getMockUser() {
    return {
      id: "",
      name: "Scott"
    };
  }
}
