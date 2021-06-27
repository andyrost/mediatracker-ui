import React from 'react'
import styles from "../styles/Carousel.module.css"

export default function carousel() {
  //TODO: redfine interface as database columns
  interface cardData {
    id: number,
    title: string,
    rating: number,
    imageURL: string
  }
  //TODO: this should be loaded from prop and based on database data
  let cardNumber:cardData[] = [
    {id: 0, title: 'test data', rating: 0, imageURL: 'https://www.uphe.com/sites/default/files/styles/scale__344w_/public/2019/01/Jaws_PosterArt_025192126291.png'},
    {id: 1, title: 'test data', rating: 1, imageURL: 'https://www.uphe.com/sites/default/files/styles/scale__344w_/public/2019/01/Jaws_PosterArt_025192126291.png'},
    {id: 2, title: 'test data', rating: 2.5, imageURL: 'https://www.uphe.com/sites/default/files/styles/scale__344w_/public/2019/01/Jaws_PosterArt_025192126291.png'},
    {id: 800, title: 'test data', rating: 8.6, imageURL: 'https://www.uphe.com/sites/default/files/styles/scale__344w_/public/2019/01/Jaws_PosterArt_025192126291.png'},
    {id: 7, title: 'test data', rating: 100, imageURL: 'https://www.uphe.com/sites/default/files/styles/scale__344w_/public/2019/01/Jaws_PosterArt_025192126291.png'},
  ];

  //TODO: carousel cards shold probably be using state 
  let carouselCards = cardNumber.map((obj, index)=>{
    let card = 
      <button onClick={()=>{showCardModal(obj)}} type="button" className={styles.card} key={obj.id} style={{backgroundImage: `url('${obj.imageURL}')`}}>
        <p className={styles.cardTitle}>{obj.title}</p>
        <p className={styles.cardRating}>{obj.rating}</p>
      </button>
    return card
  })

  let loadMoreCard = <button onClick={loadMoreCards} className={styles.card} key={-1}>
    <p className={styles.cardTitle}>Load More</p>
  </button>

  carouselCards.push(loadMoreCard);

  function showCardModal(card:cardData) {
    console.log(`TODO: generate modal with data from id:${card.id} in hiddenModal and display`);
  }

  function loadMoreCards() {
    carouselCards.pop(); //pop load more card
    console.log("TODO: load more cards here and re render state");
    carouselCards.push(loadMoreCard);
  }

  return (
    <>
    <div className={styles.carousel}>
      {carouselCards}
    </div>
    <div className="hiddenModal"></div>
    </>
  )
}
