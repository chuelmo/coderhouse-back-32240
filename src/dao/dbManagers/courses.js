import coursesModel from "../models/courses.js";

export default class Courses {
    constructor() {
        console.log("Working in mongoDB");
    }

    getAll = async () => {
        let courses = await coursesModel.find();
        return courses;
    }

    saveCourse = async (course) => {
        let result = await coursesModel.create(course);
        return result;
    }

    updateCourse = async (id) => {
        let result = await coursesModel.updateOne({ _id: id });
        return result;
    }
}