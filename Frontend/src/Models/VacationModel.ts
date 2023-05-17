class VacationModel {
    
    public vacationId: number;
    public destination: string;
    public description: string;
    public startDate: Date;
    public endDate: Date;
    public price: number;
    public pictureName: string; // url
    public image: File;
    public followersCount?:number;
    public isFollowing?:number;

}

export default VacationModel;
