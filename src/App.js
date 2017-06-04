// dependencies
import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import { Grid, Col, Row, PageHeader, Button, Panel } from 'react-bootstrap'
import { flatten } from 'lodash'

// css
import './App.css'

// game pieces
import r from './pieces/black/r.png'
import n from './pieces/black/n.png'
import b from './pieces/black/b.png'
import q from './pieces/black/q.png'
import k from './pieces/black/k.png'
import p from './pieces/black/p.png'
import P from './pieces/white/p.png'
import R from './pieces/white/r.png'
import N from './pieces/white/n.png'
import B from './pieces/white/b.png'
import Q from './pieces/white/q.png'
import K from './pieces/white/k.png'

const gameData = {
  pieces: {
    'r': r,
    'n': n,
    'b': b,
    'q': q,
    'k': k,
    'p': p,
    'P': P,
    'R': R,
    'N': N,
    'B': B,
    'Q': Q,
    'K': K
  },
  defaultFEN: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  columns: 'abcdefgh'
}

const Clock = observer(
  class Clock extends Component {
    constructor () {
      super()
      this.clockData = observable({
        date: new Date()
      })
    }
    componentDidMount () {
      this.timerID = setInterval(
        () => this.tick(),
        1000
      )
    }
    componentWillUnmount () {
      clearInterval(this.timerID)
    }
    tick () {
      this.clockData.date = new Date()
    }
    render () {
      return (
        <p>{this.clockData.date.toLocaleTimeString()}</p>
      )
    }
  }
)

/*
class Clock extends Component {
  constructor () {
    super()
    this.state = {
      date: new Date()
    }
  }
  componentDidMount () {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    )
  }
  componentWillUnmount () {
    clearInterval(this.timerID)
  }
  tick () {
    this.setState({
      date: new Date()
    })
  }
  render () {
    return (
      <p>{this.state.date.toLocaleTimeString()}</p>
    )
  }
}
*/

class Chessboard extends Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }
  render () {
    const type = this.props.type
    let rows
    if (type === 'default') rows = gameData.defaultFEN.split(' ')[0].split('/')
    else rows = this.props.fen.split(' ')[0].split('/')
    return (
      <div className='chessboard'>
        {
          rows.map((row, i) => (
            <ChessboardRow value={row} key={Math.abs(i - 8)} number={Math.abs(i - 8)} />
          ))
        }
      </div>
    )
  }
}

function ChessboardRow (props) {
  const squares = props.value.split('')
  const number = +props.number
  let color = (number % 2 === 0) ? 'light' : 'dark'
  let row = squares.map((val, i) => {
    let elem
    if (isNaN(val) === false) {
      elem = []
      for (let j = 0; j < val; j++) {
        elem.push(
          <ChessboardSquare color={color} fill={null} key={`${gameData.columns[i + j]}${number}`} number={i} />
        )
        color = color === 'light' ? 'dark' : 'light'
      }
    } else {
      elem = <ChessboardSquare color={color} fill={gameData.pieces[val]} key={`${gameData.columns[i]}${number}`} number={i} />
      color = color === 'light' ? 'dark' : 'light'
    }
    console.log(elem)
    return elem
  })
  flatten(row)
  return (
    <div className='chessboard-row'>
      {row}
    </div>
  )
}

function ChessboardSquare (props) {
  if (props.fill === null) {
    return (
      <div className={`square square-${props.color}`} />
    )
  } else {
    return (
      <div className={`square square-${props.color}`}>
        <img className='square' src={props.fill} alt={`square-${props.fill}`} />
      </div>
    )
  }
}

class App extends Component {
  render () {
    return (
      <Grid>
        <Row>
          <PageHeader>
            Ether Chess <small><Clock /></small>
          </PageHeader>
        </Row>
        <Row>
          <Col md={3} className='boxed'>
            <Panel>
              <Button block bsStyle='success'>New Game</Button>
            </Panel>
          </Col>
          <Col md={9} className='boxed'>
            <Chessboard type='default' />
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default App
