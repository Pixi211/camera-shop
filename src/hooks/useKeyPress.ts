import { useCallback, useState, useEffect } from 'react';

type useKeyPressProps ={
  targetKey: KeyboardEvent['key'];
}

export function useKeyPress({targetKey}: useKeyPressProps): boolean {
  const [keyPressed, setKeyPressed] = useState(false);

  const handlePressUp = useCallback(
    ({ key }: { key: string }) => {
      if (key === targetKey) {
        setKeyPressed(false);
      }
    },
    [targetKey],
  );

  const handlePressDown = useCallback(
    ({ key }: { key: string }) => {
      if (key === targetKey) {
        setKeyPressed(true);
      }
    },
    [targetKey],
  );

  useEffect(() => {
    document.addEventListener('keydown', handlePressDown);
    document.addEventListener('keyup', handlePressUp);

    return () => {
      document.removeEventListener('keydown', handlePressDown);
      document.removeEventListener('keyup', handlePressUp);
    };
  }, [handlePressDown, handlePressUp]);

  return keyPressed;
}
