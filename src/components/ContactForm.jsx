import { useState } from 'react';
import { CONTACT_EMAIL } from '../data/contactConfig';

const INITIAL_FORM = { from: '', message: '' };

export default function ContactForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${CONTACT_EMAIL}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            email: form.from,
            message: form.message,
            _replyto: form.from,
            _subject: `Portfolio contact from ${form.from}`,
            _template: 'table',
            _captcha: 'false',
          }),
        },
      );

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setForm(INITIAL_FORM);
      setStatus('success');
    } catch {
      setStatus('error');
      setErrorMessage(
        '送信に失敗しました。時間をおいて再度お試しください。',
      );
    }
  };

  return (
    <form className="form-area" onSubmit={handleSubmit}>
      <h1>CONTACT ME</h1>

      <div className="form-row">
        <div className="coolinput">
          <label className="text" htmlFor="from">
            from
          </label>
          <input
            className="input"
            id="from"
            name="from"
            placeholder="your@email.com"
            type="email"
            value={form.from}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="coolinput">
          <label className="text" htmlFor="message">
            message
          </label>
          <textarea
            className="input"
            id="message"
            name="message"
            placeholder="..."
            value={form.message}
            onChange={handleChange}
            required
            rows={5}
          />
        </div>
      </div>

      <button type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'SENDING...' : 'SEND'}
      </button>

      {status === 'success' && (
        <p className="form-feedback form-feedback-success">
          メッセージを送信しました。ご連絡ありがとうございます。
        </p>
      )}
      {status === 'error' && (
        <p className="form-feedback form-feedback-error">{errorMessage}</p>
      )}
    </form>
  );
}
