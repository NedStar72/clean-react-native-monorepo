import { useEffect } from 'react';
import useIsFocused from './useIsFocused';

type Destructor = () => void;

function useFocusEffect(callback: (focused: boolean) => void | Destructor) {
  const isFocused = useIsFocused();

  useEffect(() => {
    return callback(isFocused);
  }, [isFocused]);
}

export default useFocusEffect;
