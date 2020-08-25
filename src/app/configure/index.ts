export class Configure {
  host = "http://localhost:8080"
  urlLogin = this.host + "/api/auth/login"
  urlRegister = this.host + "/api/auth/register"
  urlAcount = this.host + "/api/users"
  urlGroupProduct = this.host + "/api/group-product"
  urlTypeProduct = this.host + "/api/type-product"
  urlSalePost = this.host + "/api/sale-post"
  urlGetImage = this.host + "/api/files/"
}