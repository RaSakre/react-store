import { HeaderUI } from "./HeaderUI";
import { useSelector } from "src/utils/store";
import { clearUser } from "src/slice/authSlice";
import { useDispatch } from "../../utils/store";

export const Header = () => {
  const dispatch = useDispatch();
  const basketProducts = useSelector((state) => state.webStore.basketProducts);
  const login = useSelector((state) => state.auth.userInfo.login);
  const handleLogout = () => {
    localStorage.clear();
    dispatch(clearUser());
  };
  return (
    <HeaderUI
      basketProducts={basketProducts}
      login={login}
      handleLogout={handleLogout}
    />
  );
};
