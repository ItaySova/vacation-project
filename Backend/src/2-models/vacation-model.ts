class VacationModel {
    
    public vacationId: number;
    public destination: number;
    public description: string;
    public startDate: string;
    public endDate: number;
    public price: number;
    public pictureName: string;

    public constructor(vacation: VacationModel) {
        this.vacationId = vacation.vacationId;
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.startDate = vacation.startDate;
        this.endDate = vacation.endDate;
        this.price = vacation.price;
        this.pictureName = vacation.pictureName;
    }

}

export default VacationModel;
