import React from "react";
import AreaComponent from "../Area/Area";
import './GameController.css'
import Player, {PlayerPosition} from "../../services/player";

interface GameControllerComponentProps {
  // width: number
}

interface GameControllerComponentState {
  width: number
  height: number
  playerReady: boolean,
  currentUserPosition: PlayerPosition
  lastUserPosition: PlayerPosition
}

class GameControllerComponent extends React.Component<GameControllerComponentProps, GameControllerComponentState> {
  state: GameControllerComponentState = {
    width: 10,
    height: 10,
    playerReady: false,
    currentUserPosition: {top: 0, left: 0},
    lastUserPosition: {top: 0, left: 0}
  }

  protected player: Player | undefined;


  componentDidMount() {
    this.initPlayer()
    document.addEventListener('keydown', this.handleKeyDown.bind(this))
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  initPlayer() {
    const player = new Player();
    const position = {
      top: ~~(this.state.height / 2),
      left: ~~(this.state.width / 2)
    }

    this.player = player;

    this.setState({
      playerReady: true,
      currentUserPosition: position
    })
  }

  handleKeyDown = (event: any) => {
    const step = 1;
    const newPosition: PlayerPosition = this.state.currentUserPosition
    const oldPosition: PlayerPosition = Object.assign({}, this.state.currentUserPosition);

    switch (event.keyCode) {
      case 37:
        newPosition.left -= step
        break;
      case 38:
        newPosition.top -= step
        break;
      case 39:
        newPosition.left += step
        break;
      case 40:
        newPosition.top += step
        break;
      default:
        return;
    }

    this.setState({
      lastUserPosition: oldPosition,
      currentUserPosition: newPosition
    })
  }

  onBlock = (oldPosition: PlayerPosition) => {
    this.setState({
      currentUserPosition: this.state.lastUserPosition
    })
  }

  render() {
    return (
      <div className="game">
        <div className="player">
          <h2>Player info</h2>
          <div>
            <p>{this.player?.getName()}</p>
            <p>top: {this.state.currentUserPosition.top}</p>
            <p>left: {this.state.currentUserPosition.left}</p>
          </div>
        </div>
        {
          this.state.playerReady && (
            <AreaComponent
              width={this.state.width}
              height={this.state.height}
              userPosition={this.state.currentUserPosition}
              onBlock={this.onBlock}
            />
          )
        }
      </div>
    );
  }
}

export default GameControllerComponent;
