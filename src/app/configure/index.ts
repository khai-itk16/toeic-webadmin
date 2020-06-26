export class Configure {
  // host = "https://toeic-quizz-api.azurewebsites.net"
  // host = "http://192.168.1.167:4000"
  host = "http://localhost:4000"
  // host = "http://192.168.31.27:4000"
  urlLogin = this.host + "/auth/login"
  urlCreateAccount = this.host + "/admin/account/create"
  urlListAccount = this.host + "/admin/account/get-list"
  urlUpdateAccount = this.host + "/admin/account/update/"
  urlGetAccountById = this.host + "/admin/account/"
  urlDeleteAccountById = this.host + "/admin/account/delete/"
  urlChangeLockAccountById = this.host + "/admin/account/changeLock/"

  urlGetProfile = this.host + "/user/me/profile"
  urlUpdateProfile = this.host + "/user/me/profile"
  urlProfileChangePass = this.host + "/user/me/changePass"

  urlCreateGroupQuestion = this.host + "/group-question/create"
  urlGetListGroupQuestion = this.host + "/group-question/get-list"
  urlUpdateGroupQuestionById = this.host + '/group-question/update/'
  urlDeleteGroupQuestionById = this.host + '/group-question/delete/'

  urlListPart = this.host + "/part/get-list"

  urlListTest = this.host + "/tests"
  urlCreateTest = this.host + "/tests/create"
  urlUpdateTestById = this.host + "/tests/"
  urlDeleteTestById = this.host + "/tests/delete/"
  
}