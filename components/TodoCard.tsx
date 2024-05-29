"use client"
import React from 'react'
import { DraggableProvidedDragHandleProps, DraggableProvidedDraggableProps } from '@hello-pangea/dnd'
import { XCircleIcon } from '@heroicons/react/24/solid'
import { useBoardStore } from '@/store/BoardStore'

type Props = {
    todo: Todo,
    index: number,
    id: TypedColumn,
    innerRef: (element: HTMLElement | null) => void,
    draggableProps: DraggableProvidedDraggableProps,
    dragHandleProps: DraggableProvidedDragHandleProps | null | undefined
}
function TodoCard({todo, index, id, innerRef, draggableProps, dragHandleProps} : Props) {

  const deleteTask = useBoardStore((state) => state.deleteTask);
  return (
    <div {...draggableProps}
    {...dragHandleProps}
    ref = {innerRef} className = "bg-white rounded-md space-y-2 drop-shadow-md ml-4 mr-4">
      <div className = "flex justify-between items-center p-3">
        <p>{todo.title}</p>
        <button onClick = {() => deleteTask(index, todo, id)}
        className = "text-red-500 hover:text-red-600">
            <XCircleIcon className = "ml-5 h-8 w-8"/>
        </button>
      </div>

      {/* Add image here */}
    </div>
  )
}

export default TodoCard
