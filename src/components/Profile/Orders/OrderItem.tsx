import styles from "./OrderItem.module.css";

type Props = {
  key: number;
  image: string;
  description: string;
  price: number;
};

export const OrderItem = ({ image, description, price }: Props) => {
  return (
    <div>
      <li className={styles.orderItem}>
        <img src={image} alt="" />
        {description} - {price}
      </li>
    </div>
  );
};
