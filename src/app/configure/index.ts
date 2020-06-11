export class Configure {
  // host = "http://192.168.1.167:4000"
  host = "http://localhost:4000"
  urlLogin = this.host + "/auth/login"
  urlCreateAccount = this.host + "/admin/account/create"
  urlListAccount = this.host + "/admin/account/get-list"
  urlUpdateAccount = this.host + "/admin/account/update/"
  urlGetAccountById = this.host + "/admin/account/"
  urlDeleteAccountById = this.host + "/admin/account/delete/"
  urlChangeLockAccountById = this.host + "/admin/account/changeLock/"

  urlCreateGroupQuestion = this.host + "/group-question/create"
  urlGetListGroupQuestion = this.host + "/group-question/get-list"
  urlUpdateGroupQuestionById = this.host + '/'
  urlDeleteGroupQuestionById = this.host + '/'

  urlListPart = this.host + "/part/get-list"

  urlListTest = this.host + "/tests"
  urlCreateTest = this.host + "/tests/create"
  urlUpdateTestById = this.host + "/"
  urlDeleteTestById = this.host + "/"
  
}