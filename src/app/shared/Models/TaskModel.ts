import { User } from "./UserModel";
import { Documents } from './DocModel';

export class Task{

  public ID : string = "" ;
  public Action : string = ""; 
  public DateCreation : Date ;
  public Document : Documents ;
  public User : User ;
    
  constructor(id : string , action : string, dateCreation: Date, document: Documents ,user : User) {
    this.ID = id ;
    this.Action = action;  
    this.DateCreation = dateCreation;
    this.Document = document;
    this.User = user;
   }
}