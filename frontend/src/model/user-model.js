export class User {
    constructor(
        firstName,
        lastName,
        email,
        username,
        password,
        userGender,
        userRole,
        dateOfRegistry,
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email; 
        this.username = username;
        this.password = password;
        this.userGender = userGender;
        this.userRole = userRole; 
        this.dateOfRegistry = dateOfRegistry;
    }
}