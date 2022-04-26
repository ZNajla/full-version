export class User{
    public id : string = "";
    public fullName : string ="";
    public email : string="";
    public userName : string ="";
    public phoneNumber : string = "";
    public adresse : string = "";
    public role : string ="";
    

    constructor(id : string, fullName: string, email: string, userName: string, phoneNumber : string, adresse : string,  role:string) {
      this.id = id;  
      this.fullName = fullName;
      this.email = email;
      this.userName = userName;
      this.phoneNumber = phoneNumber ;
      this.adresse = adresse;
      this.role = role;
      }
}