import "./ErrorMessage.css";

const ErrorMessage = ({ message }) => {
  return (
    <div className="error-container">
      <h3 className="error-title">Ошибка</h3>
      <p className="error-message">{message}</p>
    </div>
  );
};

export default ErrorMessage;
