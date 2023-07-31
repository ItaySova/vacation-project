import Joi from "joi";
import RoleModel from "./role-model";

class UserModel {
    public userId: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public roleId: RoleModel;

    public constructor(user: UserModel){
        this.userId = user.userId;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.roleId = user.roleId;
    }

    // TODO: Validation...
    public validateRegister(){
        const result = UserModel.registerValidationSchema.validate(this);
        return result.error?.message;
    }

    public validateEdit(){
        const result = UserModel.editValidationSchema.validate(this);
        return result.error?.message;
    }

    private static registerValidationSchema = Joi.object({
        userId: Joi.forbidden(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email:Joi.string().required().email(),
        password: Joi.string().required().min(4),
        roleId: Joi.number().required().integer().min(RoleModel.Admin).max(RoleModel.User)
    })

    private static editValidationSchema = Joi.object({
        userId: Joi.number().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email:Joi.string().required().email(),
        password: Joi.string().required().min(4),
        roleId: Joi.number().required().integer().min(RoleModel.Admin).max(RoleModel.User)
    })

}

export default UserModel;

