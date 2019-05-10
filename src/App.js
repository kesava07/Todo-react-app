import React from 'react';
import './App.css';
import todos from './Store/TodoStore';

class App extends React.Component {
  state = {
    text: "",
    list: [],
    error: null,
    edit: false,
    index: null,
    fluxTodo: todos.getAll(),
    textToEdit: null
  };
  componentDidMount() {
    todos.on('change', () => {
      this.setState({ fluxTodo: todos.getAll() })
    });
    this.nameInput.focus();
  }
  handleOnChange = event => this.setState({ text: event.target.value.trimStart() });
  handleSubmit = event => {
    const { text, list } = this.state;
    if (!text) {
      this.setState({ error: "Please enter something" });
    } else if (list.indexOf(text) > -1) {
      this.setState({ error: "The todo already exists" })
    } else {
      this.setState({ list: list.concat(text), text: "", error: "", edit: false });
    }
  };
  handleDelete = (listItem) => this.setState({ list: this.state.list.filter(val => val !== listItem), error: "" });
  handleEdit = (val, i) => this.setState({ edit: true, text: val, index: i, textToEdit: val });
  handleCancel = () => this.setState({ edit: false, text: "", error: null });
  handleUpdate = () => this.setState(state => {
    const { list, index, text } = state;
    if (list[index] !== text) {
      list[index] = text;
      return { ...state, text: "", edit: false, index: null, error: null };
    }
  }, () => this.checkForEdited(this.state));
  checkForEdited = ({ list, index, textToEdit }) => {
    if (list[index] === textToEdit) {
      this.setState({ error: "Kindly edit or cancel" })
    }
  }
  handleKeyPress = event => {
    if (event.keyCode === 13 && this.state.list[this.state.index] !== this.state.text) {
      this.handleSubmit()
    }
  };
  componentDidUpdate() {
    this.nameInput.focus();
  };
  render() {
    const { text, list, error, edit, fluxTodo } = this.state;
    return (
      <React.Fragment>
        <div className="container">
          <input
            type="text"
            ref={(input) => { this.nameInput = input; }}
            placeholder="Add the todo"
            value={text}
            onKeyUp={this.handleKeyPress}
            onChange={this.handleOnChange}
          /> &nbsp;
        {
            edit ?
              <React.Fragment>
                <button onClick={this.handleUpdate}>Update</button>&nbsp;
                <button onClick={this.handleCancel}>Cancel</button>
              </React.Fragment>
              :
              <button type="button" onClick={this.handleSubmit}>Add</button>
          }

          <ul>
            {list && list.map((val, i) => (
              <React.Fragment key={i}>
                <li>{val} &nbsp;<button onClick={() => this.handleDelete(val)}>Delete</button> &nbsp;
                <button onClick={() => this.handleEdit(val, i)}>Edit</button></li>
              </React.Fragment>
            ))}
          </ul>
          {error && <p className={`${error.includes("already") ? "warning" : null}`} style={{ color: "red" }}>{error}</p>}
          {fluxTodo && fluxTodo.map(val => <div key={val._id}>{val.name}</div>)}
        </div>
      </React.Fragment>
    )
  }
}
export default App;
