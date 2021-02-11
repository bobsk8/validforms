import { Course } from "./course.module";

export class Person {
    constructor(
        public id?: number,
        public name?: string,
        public courses?: Course[]
    ) {}
}