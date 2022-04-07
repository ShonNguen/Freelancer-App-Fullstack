export class Project{
    constructor(
        title, 
        description, 
        location,
        images = [], 
    ) {
        this.title = title; 
        this.description = description; 
        this.location = location; 
        this.images = images; 
    }
};