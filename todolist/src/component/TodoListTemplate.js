import React from 'react'
import './TodoListTemplate.css';


const TodoListTemplate = ({form, children}) => {
        return (
            <div className="warpper">
                <div className="title">
                    오늘 할일
                </div>
                <section className="form-warpper">
                  {form}
                </section>
                <section className="todos-warpper">
                { children }
                </section>
            </div>
        )
    }



export default TodoListTemplate
