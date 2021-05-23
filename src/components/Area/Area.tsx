import './Area.css';
import React from "react";
import RowComponent from "./Row";
import {PlayerPosition} from "../../services/player"

interface AreaComponentProps {
  width: number
  height: number
  userPosition: PlayerPosition
  onBlock: any,
}

interface AreaComponentState {
  place: RowPlace[] | null,
}

interface RowPlace {
  col: ColPlace[]
}

interface ColPlace {
  isBlock: boolean
  isUser: boolean
}

class AreaComponent extends React.Component<AreaComponentProps, AreaComponentState> {

  state: AreaComponentState = {
    place: null,
  }

  componentDidMount() {
    if (this.state?.place === null) {
      this.initPlace()
    }
  }

  componentDidUpdate(prevProps: Readonly<AreaComponentProps>, prevState: Readonly<AreaComponentState>, snapshot?: any) {
    const currentRow = this.state.place && this.state.place[this.props.userPosition.top];
    const currentPosition = currentRow?.col[this.props.userPosition.left];

    if (currentPosition?.isBlock) {
      this.props.onBlock()
    }

    if (this.props.userPosition.left >= this.props.width || this.props.userPosition.left < 0) {
      this.props.onBlock();
    }

    if (this.props.userPosition.top >= this.props.height || this.props.userPosition.top < 0) {
      this.props.onBlock();
    }
  }

  initPlace() {
    const placeRows: RowPlace[] = [];

    for (let row = 0; row < this.props.width; row++) {
      let onePlaceRow: RowPlace = {
        col: []
      };
      for (let column = 0; column < this.props.height; column++) {

        if (row === this.props.userPosition.top && column === this.props.userPosition.left) {
          onePlaceRow.col.push({
            isBlock: false,
            isUser: true
          });
          continue;
        }

        onePlaceRow.col.push({
          isBlock: this.randomBlock(),
          isUser: false,
        })
      }
      placeRows.push(onePlaceRow)
    }

    this.setState({
      place: placeRows
    })
  }

  randomBlock() {
    return Math.random() < 0.2;
  }

  renderRow(place: RowPlace[]) {
    let content = [];

    for (let i = 0; i < place.length; i++) {
      const blockPositions = place[i].col.map((item, index) => {
        return item.isBlock && index;
      });

      if (this.props.userPosition.top === i) {
        content.push(
          <RowComponent
            key={'row-' + i}
            width={place[i].col.length}
            userHere={true}
            userColumnPosition={this.props.userPosition.left}
            blockPosition={blockPositions}
          />
        );
      } else {
        content.push(
          <RowComponent
            key={'row-' + i}
            width={place[i].col.length}
            blockPosition={blockPositions}
          />
        );
      }
    }

    return content;
  }

  render() {
    return (
      <div className="area">
        { this.state.place && (
          this.renderRow(this.state.place)
        )}
      </div>
    );
  }
}

export default AreaComponent;
