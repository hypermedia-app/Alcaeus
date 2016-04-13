interface Operation {
    title:string;
    description:string;
    getRaw(context:any = null):Object;
}