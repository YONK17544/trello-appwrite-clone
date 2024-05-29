"use client";
import { FormEvent, Fragment } from 'react'
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { useModalStore } from '@/store/ModalStore';
import { useBoardStore } from '@/store/BoardStore';
import TaskTypeRadioGroup from './TaskTypeRadioGroup';

//v1.7 Headless UI components
function Modal() {
    const [addTask, newTaskInput, setNewTaskInput, newTaskType] = useBoardStore((state) => [
        state.addTask,
        state.newTaskInput,
        state.setNewTaskInput,
        state.newTaskType
    ])
    const [isOpen, closeModal] = useModalStore((state) => [
        state.isOpen,
        state.closeModal,
      ])

    const handleSubmit = (e:FormEvent<HTMLFormElement>) =>{
      e.preventDefault();
      if(!newTaskInput) return;
      //add task
      addTask(newTaskInput, newTaskType);


      closeModal();
    }

      return (
        // Use the `Transition` component at the root level
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog  as = "form" onSubmit = {handleSubmit} className = "relative z-10" onClose={() => closeModal}> 
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/30 bg-opacity-25" />
            </TransitionChild>
    
            {/*
              ...and another Transition.Child to apply a separate transition
              to the contents.
            */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className = "w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <DialogTitle as = "h3" className = "text-lg font-medium leading-6 text-gray-900 pb-3">
                  Add a task           
              </DialogTitle>
                <div className = "mt-2">
                    <input
                    type = "text"
                    value = {newTaskInput}
                    onChange = {(e) => setNewTaskInput(e.target.value)}
                    placeholder = "Enter a task here"
                    className = "w-full border border-gray-300 rounded-md outline-none p-5"
                    />
                </div>

                <TaskTypeRadioGroup/>
                <button type = "submit" disabled = {!newTaskInput}
                className = "inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-gray-100 diabled:text-gray-200 disabled:cursor-not-allowed"
                >
                  Add Task
                </button>
              </DialogPanel>
            </TransitionChild>
           </div>
          </div>
          </Dialog>
        </Transition>
      )
}

export default Modal;


