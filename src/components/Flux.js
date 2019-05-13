import React from 'react';
import todoStore from '../Store/Store/TodoStore';

class FluxApp extends React.Component {
    state = {
        todoStore: todoStore.getAll(),
        name: ""
    };
    handleOnchange = (event) => this.setState({ name: event.target.value });

    componentDidMount() {
        todoStore.on('change', () => {
            this.setState({ todoStore: todoStore.getAll() })
        })
    }

    handleClick = () => {
        if (this.state.name) {
            todoStore.createTodo(this.state.name);
            this.setState({ name: "" })
        }
    };
    handleEnter = event => {
        if (event.keyCode === 13) {
            this.handleClick()
        }
    }

    render() {
        const { todoStore, name } = this.state;
        return (
            <React.Fragment>
                <div>{todoStore.name}</div>
                <input
                    type="text"
                    placeholder=" enter text"
                    value={name}
                    onChange={this.handleOnchange}
                    onKeyUp={this.handleEnter}
                />&nbsp;
                <button onClick={this.handleClick}>Click</button>

                {todoStore.data.length > 0 && todoStore.data.map(val => (
                    <React.Fragment key={val.id}>
                        <div>{val.name}</div>
                    </React.Fragment>
                ))}
            </React.Fragment>
        )
    }
};

export default FluxApp;