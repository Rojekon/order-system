import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

const Login = ({ onChangeLogin }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [dataArr, setDataArr] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    let url = "//localhost:3001/users?";

    url += "name=" + name;

    const getData = async () => {
      const res = await axios.get(url).catch((error) => {
        console.error(error);
      });
      setDataArr(res.data);
    };

    //Использовал axios и get запрос, потому что json-server ругался на отсутвие id у user, при попытке делать авторизацию через post

    getData();
  }, [name, password]);

  const auth = async () => {
    await dataArr.map((el) => {
      if (el.password === password) {
        setCurrentUser(dataArr);
        onChangeLogin(dataArr);
      } else {
        alert("Неверный логин или пароль");
      }
    });
  };

  const onSubmit = (data) => {
    setName(data.name);
    setPassword(data.password);
    auth();
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="login-name">
          <input
            {...register("name", {
              required: "Это поле обязательно для заполнения",
              pattern: {
                value: /([а-яА-яa-zA-z]+\s)+([а-яА-яa-zA-z]+)/gi,
                message: "Введите корректное имя ",
              },
              minLength: {
                value: 8,
                message: "Введите корректное имя",
              },
            })}
            placeholder="Ваше имя"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        {errors?.name && <div>{errors.name.message}</div>}
        <div className="login-pass">
          <input
            {...register("password", {
              required: "Это поле обязательно для заполнения",
              minLength: {
                value: 8,
                message: "Пароль должен состоять минимум из 8 символов",
              },
            })}
            placeholder="Ваш пароль"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {errors?.password && <div>{errors.password.message}</div>}
        <button className="login-button">Войти</button>
      </form>
    </div>
  );
};

export default Login;
