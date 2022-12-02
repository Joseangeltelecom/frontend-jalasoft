export const style: React.CSSProperties = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

export const uniqueId = () => Math.floor(Math.random() * Date.now());

export const videoConstraints = {
  width: 420,
  height: 420,
  facingMode: "user",
};
