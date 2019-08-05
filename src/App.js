import React, { Component, createRef } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import db from './db'

import Formulaire from './components/Formulaire'
import Message from './components/Message'
import './App.css'
import './animation.css'

class App extends Component {
  state = {
    pseudo: this.props.match.params.pseudo,
    messages: {}
  }

  messageRef = createRef()

  componentDidMount() {
    db.syncState('/', {
      context: this,
      state: 'messages'
    })
  }

  componentDidUpdate() {
    const ref = this.messageRef.current
    ref.scrollTop = ref.scrollHeight
  }

  addMessage = message => {
    const messages = { ...this.state.messages }
    messages[`message-${Date.now()}`] = message
    Object.keys(messages)
      .slice(0, -10)
      .forEach(key => {
        messages[key] = null
      })
    this.setState({ messages })
  }

  isUser = pseudo => pseudo === this.state.pseudo

  render() {
    const message = Object.keys(this.state.messages).map(key => (
      <CSSTransition key={key} classNames='fade' timeout={200}>
        <Message
          isUser={this.isUser}
          message={this.state.messages[key].message}
          pseudo={this.state.messages[key].pseudo}
        />
      </CSSTransition>
    ))
    return (
      <div className='box'>
        <div className='messages' ref={this.messageRef}>
          <TransitionGroup className='message'>{message}</TransitionGroup>
        </div>
        <Formulaire
          length={140}
          pseudo={this.state.pseudo}
          addMessage={this.addMessage}
        />
      </div>
    )
  }
}

export default App
