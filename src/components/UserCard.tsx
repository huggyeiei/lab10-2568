import { useState } from "react";
import { UserCardDetail } from "./UserCardDetail";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";
import { type CardUserProps } from "../libs/CardUserType";
export const UserCard = ({ name, imgUrl, address, email }: CardUserProps) => {
  const [isDetailShown, setIsDetailShown] = useState(false);

  const userCardOnClick = () => {
    setIsDetailShown(!isDetailShown);
  };

  return (
    <div className="border-bottom">
      <div className="d-flex align-items-center p-3" onClick={userCardOnClick}>
        <img src={imgUrl} width="90px" className="rounded-circle me-4"></img>
        <span className="text-center display-6 me-auto">{name}</span>
        {isDetailShown ? <BsChevronUp /> : <BsChevronDown />}
      </div>
      {isDetailShown && <UserCardDetail email={email} address={address} />}
    </div>
  );
};