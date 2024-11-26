import leftGuy from '../../images/main-section/left-guy.png'
import rightGuy from '../../images/main-section/right-guy.png'
import guysUpper from '../../images/main-section/guys-upper.png'
import guysLower from '../../images/main-section/guys-lower.png'
import tomFord from '../../images/main-section/brands/tomford.jpg'
import kenzo from '../../images/main-section/brands/kenzo.png'
import polo from '../../images/main-section/brands/polo.jpg'
import armani from '../../images/main-section/brands/armani.jpg'
import balmain from '../../images/main-section/brands/balmain.jpg'
import styles from './MainSection.module.css'
import { NavLink } from 'react-router-dom'

export const MainSection = () => {
  return (
		<>
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <img src={leftGuy} alt="Изображение 1" className={styles.vertical} />
        <img src={guysUpper} alt="Изображение 2" className={styles.horizontal} />
        <img src={rightGuy} alt="Изображение 3" className={styles.vertical} />
        <img src={guysLower} alt="Изображение 4" className={styles.horizontal} />
      </div>
			<div className={styles.text}>
				<p >Ultimate <br /> sale <br /> </p>
				<p>New collection</p>
			</div>
			<NavLink to={'/shop'} className={styles.button}>SHOP NOW</NavLink>
    </div>
		<div className={styles.brands}>
			<img src={kenzo} alt="" />
			<img src={balmain} alt="" />
			<img src={armani} alt="" />
			<img src={polo} alt="" />
			<img src={tomFord} alt="" />
		</div>
		</>
  );
};
