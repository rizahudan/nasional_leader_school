import React from 'react';

export default class Header extends React.Component {
  render() {
    this.data = (
      <div>
        <div className="ui pointing secondary menu">
          <a className="active item">New</a>
        </div>

        <div role="listbox" aria-expanded="true" className="ui active visible dropdown">
            <div className="text" role="alert" aria-live="polite">Dropdown</div>
            <i aria-hidden="true" className="dropdown icon"></i>
            <div className="visible menu transition">
            <div style="pointer-events:all" role="option" aria-checked="false" aria-selected="true" className="selected item">
            <span className="text">Choice 1</span>
            </div>
            <div style="pointer-events:all" role="option" aria-checked="false" aria-selected="false" className="item">
            <span className="text">Choice 2</span>
            </div>
            </div>
        </div>               
      </div>
    );
    return this.data;
  }
}
