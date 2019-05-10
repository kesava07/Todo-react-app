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
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6  text-center">
                  <input
                    className="form-control"
                    type="text"
                    ref={(input) => { this.nameInput = input; }}
                    placeholder="Add the todo"
                    value={text}
                    onKeyUp={this.handleKeyPress}
                    onChange={this.handleOnChange}
                  />
                </div>
                <div className="col-md-3">
                  {
                    edit ?
                      <React.Fragment>
                        <button className="btn btn-sm btn-success" onClick={this.handleUpdate}>Update</button>&nbsp;
                <button className="btn btn-sm btn-danger" onClick={this.handleCancel}>Cancel</button>
                      </React.Fragment>
                      :
                      <button className="btn btn-sm btn-success" type="button" onClick={this.handleSubmit}>Add</button>
                  }
                </div>
              </div>
            </div>
            <div className="col-md-3"></div>
            <div className="col-md-6 mt-3">
              <div className="card card-body">
                <ul className="list-group">
                  {list && list.map((val, i) => (
                    <React.Fragment key={i}>
                      <li className="text-center list-group-item">{val} &nbsp;<button className="float-right btn btn-sm btn-danger ml-2" onClick={() => this.handleDelete(val)}>Delete</button> &nbsp;
                <button className="float-right btn btn-sm btn-primary" onClick={() => this.handleEdit(val, i)}>Edit</button></li>
                    </React.Fragment>
                  ))}
                </ul>
                {error && <p className={`${error.includes("already") ? "warning" : null}`} style={{ color: "red" }}>{error}</p>}
                {/* {fluxTodo && fluxTodo.map(val => <div key={val._id}>{val.name}</div>)} */}
              </div>
            </div>
          </div>


        </div>
      </React.Fragment>
    )
  }
}
export default App;
