export class User{
    public id : string = "";
    public fullName : string ="";
    public email : string="";
    public userName : string ="";
    public phoneNumber : string = "";
    public adresse : string = "";
    public gender : string = "";
    public position : string = "";
    public function : string = "";
    public birthDate : Date;
    public facebook : string = "";
    public google : string = "";
    public linkedin : string = "";
    public lastTimeLogedIn : Date;
    public role : string ="";
    
    constructor(id : string, fullName: string, email: string, userName: string, phoneNumber : string, adresse : string, gender : string ,position : string, func : string , birthDate : Date , facebook : string , google : string ,linkedin : string , lastTimeLogedIn : Date , role:string) {
      this.id = id;  
      this.fullName = fullName;
      this.email = email;
      this.userName = userName;
      this.phoneNumber = phoneNumber ;
      this.adresse = adresse;
      this.gender = gender ;
      this.position = position ;
      this.function = func ;
      this.birthDate = birthDate;
      this.facebook = facebook;
      this.google = google;
      this.linkedin = linkedin;
      this.lastTimeLogedIn = lastTimeLogedIn ;
      this.role = role;
      }
}