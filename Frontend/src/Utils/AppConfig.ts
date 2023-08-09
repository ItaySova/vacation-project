class AppConfig {
    public registerUrl = "http://localhost:4000/api/register/";
    public loginUrl = "http://localhost:4000/api/login/";
    public vacationsUrl = "http://localhost:4000/api/vacations/";
    public imagesUrl = "http://localhost:4000/api/vacations/images/";
    public followerUrl = "http://localhost:4000/api/follower/";
    public userUrl = "http://localhost:4000/api/users/";
}

const appConfig = new AppConfig();

export default appConfig;
