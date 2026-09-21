interface TimeBoxProps {
  time: string;
}

const TimeBox = ({ time }: TimeBoxProps) => {
  return (
    <div className="bg-light-box rounded-full px-3 py-1.5 ">
      <p className="text-xs font-satoshi text-light-theme-text tracking-wide">
        {time}
      </p>
    </div>
  );
};

export default TimeBox;
