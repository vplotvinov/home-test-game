export interface PlayerInterface {
  name: string
}

export interface PlayerPosition {
  top: number
  left: number
}

const init: PlayerInterface = {
  name: 'Lexa',
};

class Player {
  protected player;

  constructor() {
    this.player = init;
  }

  public getName() {
    return this.player.name
  }
}

export default Player
