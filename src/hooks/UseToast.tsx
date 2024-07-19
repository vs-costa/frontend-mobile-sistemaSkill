import { useState } from 'react';
import { ToastAndroid } from 'react-native';

const useToast = () => {
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
    setToastVisible(true);
  };

  return { showToast };
};

export default useToast;