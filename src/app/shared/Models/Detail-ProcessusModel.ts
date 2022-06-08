import { User } from "./UserModel";
import { Workflow } from "./WorkflowModel";

export class Detail_Processus{

    public Action : string = ""; 
    public Step : number ;
    public Etat : string = "" ;
    public Commentaire : string ="";
    public User : User ;
    public Processus : string ;
    
    constructor(action : string, step: number, etat: string, commentaire: string, user : User , processus : string) {
      this.Action = action;  
      this.Step = step;
      this.Etat = etat;
      this.Commentaire = commentaire;
      this.User = user;
      this.Processus = processus;
      }
}