import confetti from 'canvas-confetti';

export const launchConfetti = () => {
  try {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f97316', '#eab308', '#22c55e', '#3b82f6', '#a855f7']
    });
  } catch (err) {
    console.error("Confetti launch failed", err);
  }
};

export const launchMegaWelcomeConfetti = () => {
  try {
    const end = Date.now() + 2000;
    const interval = setInterval(() => {
      if (Date.now() > end) {
        return clearInterval(interval);
      }
      confetti({
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
        colors: ['#f97316', '#eab308', '#10b981', '#6366f1', '#ec4899']
      });
    }, 200);
  } catch (err) {
    console.error("Mega confetti launch failed", err);
  }
};
