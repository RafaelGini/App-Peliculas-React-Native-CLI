import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import UserInfo from '../interfaces/UserInfo';

const useUserInfo = () => {
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  return userInfo
};

export default useUserInfo;