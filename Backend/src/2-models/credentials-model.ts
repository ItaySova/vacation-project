class CredentialsModel {

    public firstName: string;
    public lastName: string;
    public password: string;

    public constructor(credentials: CredentialsModel) {
        this.firstName = credentials.firstName;
        this.lastName = credentials.lastName;
        this.password = credentials.password;
    }

    // TODO: Validation...

}

export default CredentialsModel;
