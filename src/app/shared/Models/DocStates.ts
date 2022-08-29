
export class DocStates{
    public ID : string = "";
    public Action : string ="";
    public Comment : string="";
    public StateDocument : string="";
    public StepNumber : number;
    public Date : Date;
    

    constructor(id : string, action: string, comment: string,  state : string , stepNumber : number,  date : Date ) {
      this.ID = id;  
      this.Action = action;
      this.Comment = comment;
      this.StateDocument = state;
      this.StepNumber = stepNumber;
      this.Date = date;
      }
}