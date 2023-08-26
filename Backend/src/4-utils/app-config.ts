class AppConfig {

    // Server Port:
    public port = 4000;

    public imagesUrl = "https://localhost:4000/api/vacations/images/";

    // Database Host (on which computer the database exists):
    public mySqlHost = "localhost";

    // Database User
    public mySqlUser = "root";

    // Database Password: 
    public mySqlPassword = "";

    // Database Name: 
    public mySqlDatabase = "vacation-database"; // Fill in database name
}

const appConfig = new AppConfig();

export default appConfig;
