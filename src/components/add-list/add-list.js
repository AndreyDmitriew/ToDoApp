import React, {Component} from 'react';
import './add-list.css';


export default class AddList extends Component {

  state = {
    label: ''
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value
    });
  };

  onSubmit = (e) => {
    e.preventDefault(); // т.к. формы для заполнения данных по умолчанию после отправки перезагружают страницу, нам это не нужно и с помощью метода preventDefault мы отменяем это ее стандартное действие
    this.props.onItemAdded(this.state.label);
  }

    render() {
      return (
        <form className='add-list-form d-flex'
              onSubmit={this.onSubmit}>
          <input type="text" 
                 className='form-control'
                 onChange={ this.onLabelChange }
                 placeholder='What needs to be done' />
          <button 
            className="add-list-form-btn"
            // onClick={ () => this.props.onItemAdded('Hello world!') }
            >
            Add Item
          </button>
        </form>
      );
    };
};


