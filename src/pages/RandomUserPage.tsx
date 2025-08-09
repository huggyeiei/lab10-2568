import { UserCard } from "../components/UserCard";
import { cleanUser } from "../libs/CleanUser";
import axios from "axios";
import { useState, useEffect } from "react";

export default function RandomUserPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [genAmount, setGenAmount] = useState<number | string>(1);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    const saveNum = localStorage.getItem("genAmount");
    if (saveNum !== null) {
      const parsed = Number(saveNum);
      if (!isNaN(parsed)) {
        setGenAmount(parsed);
      }
    }
  }, [])

  useEffect(() => {
    if (isFirstLoad) {
      setIsFirstLoad(false);
      return;
    }

    localStorage.setItem("genAmount", genAmount.toString());
  },[genAmount]);

  const generateBtnOnClick = async () => {
    
    if (Number(genAmount) <= 0 || !Number.isInteger(Number(genAmount))) return;
    setIsLoading(true);
    const resp = await axios.get(
      `https://randomuser.me/api/?results=${genAmount}`
    );
    setIsLoading(false);
    const users = resp.data.results;
    
    //Your code here
    //Process result from api response with map function. Tips use function from /src/libs/CleanUser
    //Then update state with function : setUsers(...)

    const cleanUsers = users.map(cleanUser);
    setUsers(cleanUsers);
  };


  return (
    <div style={{ maxWidth: "700px" }} className="mx-auto">
      <p className="display-4 text-center fst-italic m-4">Users Generator</p>
      <div className="d-flex justify-content-center align-items-center fs-5 gap-2">
        Number of User(s)
        <input
          className="form-control text-center"
          style={{ maxWidth: "100px" }}
          type="number"
          min = {1}
          onChange= {(event: any) => {
            const value = event.target.value; 
            if (value === ""){
              setGenAmount("");
            } else {
            setGenAmount(Number(value));
            }
          }}
          value={genAmount} 
        />
        <button className="btn btn-dark" onClick={generateBtnOnClick}
          disabled = {Number(genAmount) <= 0  || !Number.isInteger(Number(genAmount))}>
          Generate
        </button>
      </div>
      {isLoading && (
        <p className="display-6 text-center fst-italic my-4">Loading ...</p>
      )}
      { !isLoading && users.map((user) => <UserCard
      key = {user.email} 
      name = {user.name}
      imgUrl = {user.imgUrl}
      address = {user.address}
      email = {user.email}
      />
    )}
    </div>
  );
}