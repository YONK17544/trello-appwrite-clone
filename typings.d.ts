//Using map to go through the arrays. Harder version

interface Board {
    columns: Map<TypedColumn, Column>;
}

//Three columns: todos, inprogress, and done
//We are creating interfaces for all possible data entries

type TypedColumn = 'todos' | 'inprogress' | 'done';

interface Column {
    id: TypedColumn,
    todos: Todo[]
}


interface Todo {
    $id: string,
    $createdAt: string,
    title: string,
    status: string,
    image?: Image
}

interface Image {
    bucketId: string,
    fileId: string,
}