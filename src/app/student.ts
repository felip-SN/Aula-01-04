export interface Student {
    id: number,
    name: string,
    course: string
}

export interface Course {
    id: number,
    name: string,
    price: number,
    active: boolean,
    promotion: boolean
}