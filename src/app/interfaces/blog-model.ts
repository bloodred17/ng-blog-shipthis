export interface BlogModel {
    title: string;
    content: string;
    dateCreated: Date;
    dateModified: Date;
    tags: string[];
    _id?: string
}
