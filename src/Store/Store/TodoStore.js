import { EventEmitter } from 'events';

class TodoStore extends EventEmitter {
    todo = {
        name: "Hello world",
        age: 24,
        data: []
    };

    getAll = () => {
        return this.todo;
    };

    createTodo = (name) => {
        const id = Date.now()
        this.todo.data.push({ name, id });
        this.emit('change')
    };

};

const todoStore = new TodoStore();
export default todoStore;