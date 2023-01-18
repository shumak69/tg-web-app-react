import React from "react";
import { useTelegram } from "../../hooks/useTelegram";
import Button from "../Button/Button";
import "./header.css";

function Header() {
  const { user, onClose } = useTelegram();
  return (
    <div className="header">
      <Button onClick={onClose}>Закрыть</Button>
      <span className="username">{user?.username}</span>
      <span className="username">{JSON.stringify(user)}</span>
    </div>
  );
}

export default Header;
