interface HeaderProps {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title, right, subtitle }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-4xl font-bold">{title}</h1>
        <p className="text-sm sm:text-base opacity-60">{subtitle}</p>
      </div>
      {right}
    </div>
  );
};

export default Header;
