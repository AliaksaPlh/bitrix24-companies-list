import { useState } from "react";
import "./WebhookForm.css";

const WebhookForm = ({ onSubmit, disabled }) => {
  const [webhook, setWebhook] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (webhook.trim()) {
      onSubmit(webhook.trim());
    }
  };

  return (
    <div className="webhook-form-container">
      <form className="webhook-form" onSubmit={handleSubmit}>
        <label htmlFor="webhook" className="form-label">
          Webhook URL Битрикс24
        </label>
        <input
          autoFocus
          id="webhook"
          type="text"
          className="form-input"
          placeholder="https://your-domain.bitrix24.ru/rest/1/webhook_code/"
          value={webhook}
          onChange={(e) => setWebhook(e.target.value)}
          disabled={disabled}
          required
        />

        <button
          type="submit"
          className="form-button"
          disabled={disabled || !webhook.trim()}
        >
          Загрузить
        </button>
      </form>
    </div>
  );
};

export default WebhookForm;
