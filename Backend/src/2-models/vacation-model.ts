import Joi from "joi";

class VacationModel {
    
    public vacationId: number;
    public destination: string;
    public description: string;
    public startDate: Date;
    public endDate: Date;
    public price: number;
    public pictureName: string;
    public isFollowing?: number;

    public constructor(vacation: VacationModel) {
        this.vacationId = vacation.vacationId;
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.startDate = vacation.startDate;
        this.endDate = vacation.endDate;
        this.price = vacation.price;
        this.pictureName = vacation.pictureName;
    }

    // TODO: Validation...
    public validatePost(){
        const result = VacationModel.postValidationSchema.validate(this);
        return result.error?.message;
    }

    public validatePut(){
        const result = VacationModel.putValidationSchema.validate(this);
        return result.error?.message;
    }

    private static postValidationSchema = Joi.object({
        vacationId: Joi.forbidden(),
        destination: Joi.string().required(),
        description: Joi.string().required(),
        startDate: Joi.required(),
        endDate: Joi.required() ,
        price:Joi.number().required().min(0).max(10000),
        pictureName: Joi.required()
    })

    private static putValidationSchema = Joi.object({
        vacationId: Joi.number().integer().positive(),
        destination: Joi.string().required(),
        description: Joi.string().required(),
        startDate: Joi.required(),
        endDate: Joi.required() ,
        price:Joi.number().required().min(0).max(10000),
        pictureName: Joi.required()
    })

}

export default VacationModel;
