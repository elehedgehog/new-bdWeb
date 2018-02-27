import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { DialogService } from '../../dialog/dialog.service'
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    public LoginService: LoginService,
    public router: Router,
    private dialogService: DialogService
  ) { }
  loginPop: boolean = true
  forgetPswPop: boolean = false
  registerPop: boolean = false
  username: string = ''
  phone: string = ''
  enrollPhone: string = ''
  password: string = ''
  identifyingCode: string = ''
  telIdentifyingCode: string = ''
  loginName: string = ''
  loginPass: string = ''
  remberSelected: boolean = false //标记记住密码选项
  //忘记密码
  retrievePhone: string = ''
  retrievePhoneHolder: number = Date.now()   
  retrieveCode: string = ''
  retrieveTelCode: string = ''
  newPsw: string = ''
  newPswConfirm: string = ''
  identifyingData: any = {}
  allUserList: any = []
  ngOnInit() {
    if(localStorage.username) {
      this.loginName = localStorage.username;
      this.loginPass = localStorage.password;
      this.remberSelected = true;
    }
    this.getAllUser()
  }
  async registerBtn() { //注册
    await this.getIdentifying()    //验证码
    this.loginPop=false
    this.registerPop=true
  }
  async forgetPassBtn() { 
    await this.getIdentifying()    //验证码
    this.loginPop=false
    this.forgetPswPop=true
  }
  
  async getAllUser() {
    const res = await this.LoginService.getAllUser()
    if(!res) return
    console.log(res)
    for(let item of res) {
      this.allUserList[item.phone] = item.uid
    }
    console.log(this.allUserList)
  }
  async getLogin() {
    let isPhone = /^\d{11}$/.test(this.loginName)
    let param = (isPhone ? `phone=` : 'username=') + this.loginName
    const res = await this.LoginService.getLogin(param, this.loginPass)
    if(!res) return
    const username = this.loginName,
					password = this.loginPass;
    if(this.remberSelected) {
      localStorage.username = username;
      localStorage.password = password;
    } else {
      if(localStorage.username) {
        localStorage.removeItem('username');
        localStorage.removeItem('password');
      }
    }
    this.router.navigateByUrl('home');
  }
  toggleRememberPass(){     //记住密码
    this.remberSelected = !this.remberSelected
  }
  async getMessage() {  //获取手机验证码
    const res = await this.LoginService.getMessage(this.enrollPhone)
    if(!res) return
  }
  async getForMess(){
    const res = await this.LoginService.getMessage(this.retrievePhone)
    if(!res) return
  }
  async toggleRegister() { //注册
    const res = await this.LoginService.getAddUser(this.username,this.password,this.enrollPhone,this.telIdentifyingCode,this.identifyingCode,this.identifyingData.flag)
    console.log(res)
    if(!res) return
    if (res.stateCode === -16) {
      this.dialogService.displayTip('error','验证码错误')
    }
    else if (res.stateCode === -15) {
      this.dialogService.displayTip('error','手机验证码错误')
    }
    else if (res.stateCode === 0) {
      //提示注册成功
      this.dialogService.displayTip('success','注册成功')
      this.username = ''
      this.password = '' 
      this.enrollPhone = ''  
      this.telIdentifyingCode = '' 
      this.identifyingCode = ''
      this.loginPop = true
      this.registerPop = false
      this.loginName = ''
      this.loginPass = ''
    }
  }
  async resetPassword() {  //忘记密码
    if(this.newPsw !== this.newPswConfirm){
      this.dialogService.displayTip('error','密码输入不一致')
      return
    }
    let uid =  this.allUserList[this.retrievePhone]
    const res = await this.LoginService.resetPassword(uid,this.newPsw,this.retrievePhone,this.retrieveTelCode,this.retrieveCode,this.identifyingData.flag)
    if(!res) return
    console.log(res)
    if (res.stateCode === -16) {
      this.dialogService.displayTip('error','验证码错误')
    }
    else if (res.stateCode === -15) {
      this.dialogService.displayTip('error','手机验证码错误')
    }
    else if (res.stateCode === 0) {
      this.dialogService.displayTip('success','密码修改成功')
      this.newPsw = ''
      this.newPswConfirm = ''
      this.retrievePhone = ''
      this.retrieveTelCode = ''
      this.retrieveCode = ''
      this.loginPop=true
      this.forgetPswPop=false
    }
  }
  async getIdentifying() {   //验证码
    const res = await this.LoginService.getIdentifying()
    if(!res) return
    this.identifyingData = res
  }
  async changeEnrollPhoneHolder(){      //点击获取验证码
    await this.getIdentifying()
  }
 
}