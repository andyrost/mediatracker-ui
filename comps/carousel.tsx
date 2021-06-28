import React, {useState, Component} from 'react'
import styles from "../styles/Carousel.module.css"

//TODO: redfine interface as database columns
interface cardData {
  id: number,
  title: string,
  rating: number,
  imageURL: string
}
class Carousel extends Component {
  state = {
    cardDataArray: [
      {id: 0, title: 'test data', rating: 0, imageURL: 'https://www.uphe.com/sites/default/files/styles/scale__344w_/public/2019/01/Jaws_PosterArt_025192126291.png'},
      {id: 1, title: 'test data', rating: 1, imageURL: 'https://www.uphe.com/sites/default/files/styles/scale__344w_/public/2019/01/Jaws_PosterArt_025192126291.png'},
      {id: 2, title: 'test data', rating: 2.5, imageURL: 'https://www.uphe.com/sites/default/files/styles/scale__344w_/public/2019/01/Jaws_PosterArt_025192126291.png'},
      {id: 800, title: 'test data', rating: 8.6, imageURL: 'https://www.uphe.com/sites/default/files/styles/scale__344w_/public/2019/01/Jaws_PosterArt_025192126291.png'},
      {id: 7, title: 'test data', rating: 100, imageURL: 'https://www.uphe.com/sites/default/files/styles/scale__344w_/public/2019/01/Jaws_PosterArt_025192126291.png'},
    ]
  }

  Carousel() {
    console.log('constructor called');
  }

  addCard() {
    let currentCardDataState = this.state.cardDataArray;
    currentCardDataState.push({id: 10, title: 'new data', rating: 100, imageURL: ''})

    console.log('adding card to state');

    this.setState({
      cardDataArray: currentCardDataState
    })
  }

  render() {
    return (
      <div id="Carousel" className={styles.carousel}>
        {this.state.cardDataArray.map((item) => {
          let card = 
          <button type="button" className={styles.card} key={item.id} style={{backgroundImage: `url('${item.imageURL}')`}}>
            <p className={styles.cardTitle}>{item.title}</p>
            <p className={styles.cardRating}>{item.rating}</p>
          </button>

          return card;
        })}
        <button type="button" className={styles.card} key={-1} onClick={() => {this.addCard()}}>
          <p className={styles.cardTitle}>load More</p>
        </button>
      </div>
    )
  }
}

export default Carousel;