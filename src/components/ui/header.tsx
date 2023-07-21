interface HeaderProps {
  title: string;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="space-y-2">
      <h1 className="text-2xl sm:text-4xl font-bold">{title}</h1>
      <p className="text-sm sm:text-base opacity-60">{subtitle}</p>
    </div>
  );
};

export default Header;
