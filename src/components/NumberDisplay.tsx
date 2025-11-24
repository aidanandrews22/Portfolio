interface NumberDisplayProps {
  value: number;
}

const NumberDisplay: React.FC<NumberDisplayProps> = ({ value }) => {
  const formattedValue = value >= 1000 ? "1k+" : value.toString();

  return <span>{formattedValue}</span>;
};

export default NumberDisplay;
