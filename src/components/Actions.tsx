interface ActionsProps {
  children: React.ReactNode; // Type for children
  className?: string; // Optional className
  onClick?: () => void; // Optional onClick handler
}
const Actions: React.FC<ActionsProps> = ({ children, className, onClick }) => {
  return (
    <p onClick={onClick} className={className}>
      {children}
    </p>
  );
};

export default Actions;
