import React from 'react';
import '../style/Lyric.less'

class Lyric extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLyricIndex: 0,
      offsetHeight: 0
    }
    this.lyricListElement = this.lyricListElement.bind(this);
  }

  componentWillReceiveProps() {
    let { lyricList, timeList, currentTime } = this.props, offsetHeight;

    if (lyricList && lyricList.length > 0) {
      console.log(currentTime);
      for (let i = 0; i < timeList.length; i++) {
        if (timeList[i] < currentTime && timeList[i + 1] > currentTime) {
          if (this.state.currentLyricIndex != i) {
            this.setState({
              currentLyricIndex: i
            })
            if (i > 6) {
              offsetHeight = (this.lyricElement.childNodes)[i].offsetHeight;
              this.setState({
                offsetHeight: this.state.offsetHeight - offsetHeight
              })
            }
          }
        }
      }

    }
  }

  lyricListElement() {
    const { lyricList } = this.props;
    let _lyricList = [];
    if (lyricList) {
      lyricList.forEach((it, index) => {
        _lyricList.push(
          <div key={index}
            className="lyric-item"
            style={
              this.state.currentLyricIndex == index ? { color: "green" } : null
            }>
            {it.content}
          </div>
        )
      })
    }
    return _lyricList;
  }

  render() {
    return (
      <div
        className="lyric-content"
        style={{ top: this.state.offsetHeight }}
        ref={(input) => { this.lyricElement = input; }}>
        {this.lyricListElement()}
      </div>
    )
  }
}
export default Lyric;
