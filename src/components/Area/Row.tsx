import React from "react";

interface RowComponentProps {
  width: number
  userHere?: boolean | undefined
  userColumnPosition?: number | undefined
  blockPosition?: any,
}

interface RowComponentState {
}

class RowComponent extends React.Component<RowComponentProps, RowComponentState>
{
  renderColumn(count: number) {
    let content = [];

    for (let i = 0; i < count; i++) {
      if (this.props.userColumnPosition === i) {
        content.push(
          <div key={'col-' + i} className="col col--user" />
        )
      } else {
        const isBlock = this.props.blockPosition?.includes(i);
        content.push(
          <div key={'col-' + i} className={isBlock ? 'col col--block' : 'col'}/>
        )
      }
    }

    return content;
  }

  render() {
    return (
      <div className="row" style={{width: this.props.width * 50}}>
        { this.renderColumn(this.props.width) }
      </div>
    );
  }
}

export default RowComponent;
