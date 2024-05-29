import { databases } from "@/appwrite"
import 'dotenv/config';

require('dotenv').config();

//Creating a function that provides the various columns of todos to be displayed
export const getTodosGroupedByColumn = async () => {
    //fetching data from the databases in appwrite
    const data = await databases.listDocuments(
       process.env.NEXT_PUBLIC_DATABASE_ID!,
       process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!
    );
    
    //Assigning the documents info to todos variable 
    const todos = data.documents;

    //Mapping the data into columns with reduce, we are comparing the status for each todo:
    const columns = todos.reduce((acc, todo) =>{
        if(!acc.get(todo.status)){
            acc.set(todo.status, {
                id: todo.status,
                todos: []
            })
        }
            
        //Passing a new todo to the new Map array we have created 
    
        acc.get(todo.status)!.todos.push({
            $id: todo.$id,
            $createdAt: todo.$createdAt,
            title: todo.title,
            status: todo.status,
            ...(todo.image && { image: JSON.parse(todo.image)})
        });

        return acc;

        

    }, new Map<TypedColumn, Column>()); //default value, empty map

    //if columns doen't have inprogress, todo, and done then add them with empty todos.
    const columnTypes: TypedColumn[] =["todos", "inprogress", "done"];
    for (const columnType of columnTypes) {
        if(!columns.get(columnType)){
            columns.set(columnType, {
                id: columnType,
                todos: []
            })
        }
    }

    console.log(columns);

    //sort column by columnTypes
    const sortedColumns = new Map(
        Array.from(columns.entries()).sort(
            (a, b) => columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0]) 
        )
    );

    const board: Board = {
        columns: sortedColumns
    }

    return board;
}