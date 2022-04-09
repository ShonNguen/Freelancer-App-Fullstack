export class Project{
    constructor(
        title, 
        description, 
        location,
        files = [], 
    ) {
        this.title = title; 
        this.description = description; 
        this.location = location; 
        this.files = files; 
    }
};