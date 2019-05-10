import { EventEmitter } from 'events';

class TodoStore extends EventEmitter {
    todos = [
        {
            name: "chenna kesava",
            _id: 125412541,
            complete: false
        },
        {
            name: "Vinod",
            _id: 2547854,
            complete: false
        }
    ];
    crateTodo(text) {
        const id = Date.now();
        this.todos.push({
            _id: id,
            name: text,
            complete: false
        });
        this.emit('change')
    }
    getAll() {
        return this.todos
    }
};
const todoStore = new TodoStore();
window.todoStore = todoStore
export default todoStore;