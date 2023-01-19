import { useCallback, useEffect, useState } from "react";
import { useTelegram } from "../../hooks/useTelegram";
import "./form.css";
function Form() {
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [subject, setSubject] = useState("physical");
  const { tg } = useTelegram();

  const onSendData = useCallback(() => {
    const data = {
      city,
      street,
      subject,
    };
    tg.sendData(JSON.stringify(data));
  }, [country, street, subject]);

  useEffect(() => {
    tg.onEvent("mainButtonClicked", onSendData);
    return () => {
      tg.offEvent("mainButtonClicked", onSendData);
    };
  }, []);

  useEffect(() => {
    tg.MainButton.setParams({
      text: "Отправить данные",
    });
    console.log(tg.MainButton);
  }, []);

  useEffect(() => {
    if (!street || !city) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }, [city, street]);

  const onChangeCity = (e) => {
    setCity(e.target.value);
  };
  const onChangeStreet = (e) => {
    setStreet(e.target.value);
  };
  const onChangeSubject = (e) => {
    setSubject(e.target.value);
  };

  return (
    <div className="form">
      <h3>Введите ваши данные </h3>
      <input type="text" placeholder="Город" className="input" value={city} onChange={onChangeCity} />
      <input type="text" placeholder="Улица" className="input" value={street} onChange={onChangeStreet} />
      <select className="select" value={subject} onChange={onChangeSubject}>
        <option value="physical">Физ. лицо</option>
        <option value="legal">Юр. лицо</option>
      </select>
    </div>
  );
}

export default Form;
