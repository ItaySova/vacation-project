import Joi from "joi";

class CredentialsModel {

    public email:string;
    public password: string;

    public constructor(credentials: CredentialsModel) {
        this.email = credentials.email;
        this.password = credentials.password;
    }

    // TODO: Validation...
    public validateLogin(){
        const result = CredentialsModel.ValidationSchema.validate(this);
        return result.error?.message;
    }

    private static ValidationSchema = Joi.object({
        email:Joi.string().required().email(),
        password: Joi.string().required().min(4)
    })

}

export default CredentialsModel;
