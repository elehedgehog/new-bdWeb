import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable()
export class LoginService {
  constructor(
    public http: HttpClient
  ) { }
  private baseUrl = 'http://10.148.83.221:10190/bigdata';
  private allUrl = `/access/control/user/all`  //查询所有用户接口
  private loginUrl = `/access/control/user/login`    //用户登陆接口
  private addUserUrl = `/access/control/user/add`    //新增用户接口
  private resetUrl = `/access/control/user/reset`    //忘记密码接口
  private sendUrl = `/access/control/user/phone/send`    //发送短信(获取手机验证码)接口
  private createUrl = `/access/control/user/captcha/create`    //验证码接口

  async getAllUser(isPass?: number){
    let res: { data:allUser[] } = null;
    try {
      res = <{ data: allUser[] }>(await this.http
        .get(this.baseUrl + this.allUrl + (isPass ? '?isPass=' + isPass : '')).toPromise());
    } catch (err) {
      return null;
    }
    return res.data
  }
  async getLogin(param: string, password: string) { //用户登陆接口
    let res: { data:string[] } = null;
    try {
      res = <{ data: string[] }>(await this.http
        .get(this.baseUrl + this.loginUrl + '?' + param + '&password=' + password).toPromise());
    } catch (err) {
      return null;
    }
    return true
  }
  async getAddUser(username: string, password: string, phone: string, verificationCode: string, captcha: string, captchaFlag: string ) {  //新增用户接口 注册
    let res: { data: { data: any, stateCode: number, message: string } } = null;
    try {
      res = <{ data: { data: any, stateCode: number, message: string } }>(await this.http
        .get(this.baseUrl + this.addUserUrl + '?username=' + username + '&password=' + password +'&phone=' + phone + '&verificationCode=' + verificationCode+ '&captcha=' + captcha+ '&captchaFlag=' + captchaFlag
        ).toPromise());
      // let param = {
      //   username: username,
      //   password: password,
      //   phone: phone,
      //   verificationCode: verificationCode,
      //   captcha: captcha,
      //   captchaFlag: captchaFlag,
      // }
      // res = <{ data: string[] }>(await this.http
      //   .post(this.baseUrl + this.addUserUrl, JSON.parse(JSON.stringify(param))).toPromise());
    } catch (err) {
      return null;
    }
    return res.data
  }
  async getMessage(phone: string){  //手机验证码
    let res: { data:string[] } = null;
    try {
      res = <{ data: string[] }>(await this.http
        .get(this.baseUrl + this.sendUrl + '?phone=' + phone
        ).toPromise());
    } catch (err) {
      return null;
    }
    return res.data
  }
  async getIdentifying(){  //验证码
    let res: { data:string[] } = null;
    try {
      res = <{ data: string[] }>(await this.http
        .get(this.baseUrl + this.createUrl
        ).toPromise());
    } catch (err) {
      return null;
    }
    return res.data
  }

  async resetPassword(uid: string, password: string, phone: string, verificationCode: string, captcha: string, captchaFlag: string ) { //忘记密码
    let res: { data: { data: any, stateCode: number, message: string } } = null;
    try {
      res = <{ data:  { data: any, stateCode: number, message: string } }>(await this.http
        .get(this.baseUrl + this.resetUrl + '?uid=' + uid + '&password=' + password +'&phone=' + phone + '&verificationCode=' + verificationCode + '&captcha=' + captcha + '&captchaFlag=' + captchaFlag ).toPromise());
    } catch (err) {
      return null;
    }
    return res.data
  }
}