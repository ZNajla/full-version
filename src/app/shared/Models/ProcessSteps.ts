export class ProcessSteps{
    public StepNumber : number ;
    public Action : string = "";
    public UserName : string = "";
    public UserEmail : string = "";

    constructor(stepNumber : number , action : string , userName : string , userEmail : string){
        this.StepNumber = stepNumber;
        this.Action = action ;
        this.UserName = userName ;
        this.UserEmail = userEmail ;
    }
}