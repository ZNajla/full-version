import { State } from './../../taskboard-ngrx/store/taskboard.reducers';
import { Types } from './TypesModal';
import { User } from './UserModel';
export class Document{
    public ID : string = "";
    public Url : string ="";
    public Reference : string="";
    public Titre : string ="";
    public NbPage : number;
    public MotCle : string = "";
    public Version : string ="";
    public Date : Date;
    public DateUpdate : Date;
    public CurrentState : string;
    public CurrentNumberState : number;
    public user : User;
    public type : Types;
    

    constructor(id : string, url: string, reference: string, titre: string, nbPage : number , motCle : string,  version:string , date : Date ,dateUpdate : Date , currentState : string , currentNumberState : number, user : User , types : Types) {
      this.ID = id;  
      this.Url = url;
      this.Reference = reference;
      this.Titre = titre;
      this.NbPage = nbPage;
      this.MotCle = motCle;
      this.Version = version;
      this.Date = date;
      this.DateUpdate = dateUpdate;
      this.CurrentState = currentState;
      this.CurrentNumberState = currentNumberState;
      this.user = user ;
      this.type = types;
      }
}