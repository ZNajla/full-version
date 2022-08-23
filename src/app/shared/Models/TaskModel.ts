import { User } from "./UserModel";

export class Task{

  public ID : string = "" ;
  public Action : string = ""; 
  public Etat : string = "";
  public DateCreation : Date ;
  public Document : any ;
  public User : User ;
    
  constructor(id : string , action : string, etat : string , dateCreation: Date, document: any ,user : User) {
    this.ID = id ;
    this.Action = action;  
    this.Etat = etat ;
    this.DateCreation = dateCreation;
    this.Document = document;
    this.User = user;
   }
}