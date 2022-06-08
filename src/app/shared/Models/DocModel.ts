import { Types } from './TypesModal';
import { User } from './UserModel';
export class Document{
    public id : string = "";
    public Url : string ="";
    public Reference : string="";
    public Titre : string ="";
    public NbPage : number;
    public MotCle : string = "";
    public Version : string ="";
    public Date : Date;
    public user : User;
    public type : Types;
    

    constructor(id : string, url: string, reference: string, titre: string, nbPage : number , motCle : string,  version:string , date : Date , user : User , types : Types) {
      this.id = id;  
      this.Url = url;
      this.Reference = reference;
      this.Titre = titre;
      this.NbPage = nbPage;
      this.MotCle = motCle;
      this.Version = version;
      this.Date = date;
      this.user = user ;
      this.type = types;
      }
}