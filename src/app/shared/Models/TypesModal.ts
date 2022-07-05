import { Workflow } from "./WorkflowModel";

export class Types{
    public ID : string = "";
    public Nom : string = "";
    public Process : Workflow ;
    

    constructor(id : string, nom: string , process : Workflow) {
      this.ID = id;  
      this.Nom = nom;
      this.Process = process;
      }
}