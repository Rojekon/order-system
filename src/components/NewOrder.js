import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function NewOrder(props) {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm();
  const currentUser = props.currentUser;
  const userName = currentUser.map((el) => el.name);
  const today = new Date();
  const [name, setName] = useState(userName);
  const [address, setAddress] = useState("");
  const [comment, setComment] = useState("");

  var now = today.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  function addOrder() {
    const url = "//localhost:3001/events";
    axios
      .post(url, {
        name: name,
        address: address,
        date: now,
        status: "Новый",
        comment: comment,
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const onSubmit = (data) => {
    setName(data.name);
    setAddress(data.password);
    setComment(data.address);
    addOrder();
    resetField("address");
    resetField("comment");
  };

  const intialValues = {
    name: userName,
  };

  return (
    <div className="n-order">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <p className="text-add">Добавить заказ</p>
          <input
            defaultValue={intialValues.name}
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
            placeholder="Введите Ваше имя"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        {errors?.name && <div>{errors.name.message}</div>}
        <div>
          <input
            {...register("address", {
              required: "Это поле обязательно для заполнения",
              minLength: {
                value: 8,
                message: "Введите корректный адрес",
              },
            })}
            placeholder="Введите ваш адрес"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        {errors?.address && <div>{errors.address.message}</div>}
        <div>
          <input
            {...register("comment")}
            placeholder="Коментарий"
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <button className="add-button">Добавить заказ</button>
      </form>
    </div>
  );
}
