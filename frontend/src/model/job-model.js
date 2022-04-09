export class Job{
    constructor(
        title, 
        description, 
        location,
        images, 
        //applied = [user_id]
    ) {
        this.title = title; 
        this.description = description; 
        this.location = location; 
        this.images = images; 
    }
};