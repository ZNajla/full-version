export class Workflow{
    public id : string = "";
    public nomProcessus : string = "";
    public description : string ="";
    

    constructor(id : string, nomProcessus: string, description: string) {
      this.id = id;  
      this.nomProcessus = nomProcessus;
      this.description = description;
    }
}