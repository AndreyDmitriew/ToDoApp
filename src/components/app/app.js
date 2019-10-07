import React, { Component } from 'react';

import './app.css';

import AppHeader from '../app-header'
import SearchPanel from '../search-panel'
import TodoList from '../todo-list'
import ItemStatusFilter from '../item-status-filter'
import AddList from '../add-list'

export default class App extends Component {

    maxId = 100;

    state = {
        todoData: [
            this.createTodoItem('Drink coffee'),
            this.createTodoItem('Make Awesome App'),
            this.createTodoItem('Have a lunch')
        ],
        term: ''
    };

    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        }
    }

    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex( (el) => el.id === id );

            const before = todoData.slice(0, idx);
            const after = todoData.slice(idx + 1); //когда не передаем 2й индекс значит от начала и до конца

            const newArray = [...before, ...after];

            return {
                todoData: newArray
            };
        });
    };

    addItem = (text) => {
        const newItem = this.createTodoItem(text);
        this.setState( ({ todoData }) => {
            const newArray = [...todoData, newItem]
            return {
                todoData: newArray
            };
        });
    };

    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex( (el) => el.id === id );
            
        // 1. update object
        const oldItem = arr[idx];
        const newItem = {...oldItem, [propName]: !oldItem[propName]};  // - создаем новый объект на основе старого используя spred Оператор, все свойства нового объекта будут такими же как и у старого второе свойство "done" перезапишет первое свойство "...oldItem". done: !oldItem.done - для того что бы получилось противоположне значение теперь у нас есть новый элемент newItem точно такой же как и oldItem кроме значения done которое стало противоположным. старый объект мы не изменяли мы просто скопировали с него ключи и значения

        // 2. constract new array
        return [
            ...arr.slice(0, idx), // берем все элементы до заданного элемента(idx)
            newItem, // вставляем новый элемент у которого св-во done изменено на противоположное значение
            ...arr.slice(idx + 1) // берем все элементы после заданного значения. в итоге у нас массив newArray со старыми значениями и в середине наше новое значение
        ];
    }

    onToggleDone = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done') // здесь мы возврашаем новый state
            };
        });                                                         
    };                                                                 

    onToggleImportant = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important') // здесь мы возврашаем новый state
            };
        });
    };

    onSearchChange = (term) => {
        this.setState({ term })
    };

    search (items, term) {
        if (term.length === 0) {
            return items;
        };

        return items.filter((item) => {
            return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1
        });
    };


    render() {
        const { todoData, term } = this.state; // this.state повторяется что бы не писать его в коде много раз, присваваем его в переменную или динамич переменную (уточнить)
        const visibleItems = this.search(todoData, term);
        const doneCount = todoData.filter((el) => el.done).length; // отфильтровали массив и state , создали новый массив, в новом массиве мы сохранили только те значения у которых есть done которое true и затем мы посчитали длину этого массива
        const unDoneCount = todoData.filter((el) => el).length - doneCount;

        return (
            <div className='main'>
                <AppHeader toDo={ unDoneCount } done={ doneCount } />
                <SearchPanel onSearchChange = {this.onSearchChange} />
                <ItemStatusFilter />
                <TodoList 
                    todos={ visibleItems }
                    onDeleted={ this.deleteItem } 
                    onToggleImportant = {this.onToggleImportant}
                    onToggleDone = {this.onToggleDone}
                />
                <AddList onItemAdded = {this.addItem} />    
            </div>
        );
    } 
};

