import { cls } from '@/lib/utils';

interface ContainerProps {
  className?: string;
  children?: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ className, children }) => {
  return <div className={cls('p-4 lg:p-6', className)}>{children}</div>;
};

export default Container;
