import { Link, useParams } from 'react-router-dom';
import { useSelector } from '../../utils/store';
import styles from './Card.module.css'

export const Card = () => {
  const { id } = useParams();
  const clothes = useSelector(state => state.webStore.clothes);
  
  // Преобразуем id в число и проверяем, существует ли товар
  const productId = Number(id) - 1;
  const product = clothes[productId];

  return (
    <div className={styles.detailsWrapper}>
      <Link className={styles.detailsButton} to={'/shop'}>	&larr; Назад в магазин</Link>
      {product ? ( // Проверяем, существует ли товар
        <div className={styles.productDetails}>
          <img className={styles.detailsImage} src={product.image} alt="" />
          <div className={styles.detailsTexts}>
            <p>{product.description}</p>
            <p>{product.price}</p>
						<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae et, ipsum ut, voluptates aliquid nihil quis earum, incidunt deserunt fuga qui reiciendis rem ea veniam sunt exercitationem. Sequi, dolore quis?</p>
          </div>
        </div>
      ) : (
        <p>Товар не найден</p> // Сообщение об ошибке
      )}
    </div>
  );
}