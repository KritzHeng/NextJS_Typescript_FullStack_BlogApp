import { FC, MouseEventHandler, ReactNode, useCallback, useEffect, useId } from "react";


export interface ModalProps {
  visible?: boolean;
  onClose?(): void;
}

interface Props extends ModalProps {
  children: ReactNode;
}

const ModalContainer: FC<Props> = ({
  visible,
  children,
  onClose,
}): JSX.Element | null => {
  const contrainerId = useId()


  const handleClose = useCallback(() => {
    onClose && onClose();
  }, [onClose])

  const handleClick: MouseEventHandler<HTMLDivElement> = ({ target }: any) => {
    if (target.id === contrainerId) handleClose();
  }

  useEffect(() => {
    const closeModal = ({ key }: any) => key === "Escape" && handleClose()
    document.addEventListener('keydown', closeModal)
    return () => document.removeEventListener("keydown", closeModal)
  }, [handleClose])

  if (!visible) return null;
  return (
    <div
      id={contrainerId}
      onClick={handleClick}
      className="fixed inset-0 bg-primary dark:bg-primary-dark dark:bg-opacity-5 bg-opacity-5 backdrop-blur-[2px] z-50 flex items-center justify-center">
      {children}
    </div>
  );
};

export default ModalContainer;
