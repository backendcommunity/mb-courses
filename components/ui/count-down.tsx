import { useEffect, useState } from "react";

interface CountdownProps {
  startDate: string; // ISO date string, e.g. "2025-09-01T00:00:00Z"
}

const Countdown: React.FC<CountdownProps> = ({ startDate }) => {
  const [daysRemaining, setDaysRemaining] = useState<number>(0);

  useEffect(() => {
    const calculateRemaining = () => {
      const start = new Date(startDate).getTime();
      const now = new Date().getTime();

      const diff = start - now;

      if (diff <= 0) {
        setDaysRemaining(0);
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        setDaysRemaining(days);
      }
    };

    // run immediately
    calculateRemaining();

    // update every 24h (you can make it every second if you want hh:mm:ss countdown)
    const timer = setInterval(calculateRemaining, 1000 * 60 * 60);

    return () => clearInterval(timer);
  }, [startDate]);

  return (
    <div className="text-xl font-bold">
      {daysRemaining > 0
        ? `${daysRemaining} day${daysRemaining !== 1 ? "s" : ""} remaining`
        : "Cohort started!"}
    </div>
  );
};

export default Countdown;
