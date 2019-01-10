import React, { Component } from 'react';
import Checkbox from 'rc-checkbox';

import { getTodos } from './apiClient/todoApiClient';

class ObjectRow extends Component {

  render() {
    const checked = this.props.obj.attributes.done === true ? 1 : 0;

    return (
      <tr>
        <td><span>{this.props.obj.attributes.name}</span></td>
        <td><Checkbox checked={checked} /></td>
      </tr>
    )
  }
}

class TodosTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: []
    };
  }

  async componentDidMount() {
    this.timerId = setInterval(
      () => {
        this.tick()
      },
      10000
    );
    //todo: learn how to get service endpoints using istio/pilot ? 
    const host = "http://" + window.location.hostname;
    this.setState({
      todos: await getTodos(host)
    })

  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  async tick() {
    this.setState({
      todos: await getTodos()
    })
  }

  render() {
    return (
      <div>
        <table>
          <tbody>
            {this.state.todos.map(function (todoItem, i) {
              return <ObjectRow obj={todoItem} key={i} />;
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <TodosTable />
    )
  }
}

export default App;
