import React, { useState, useEffect } from "react";
import axios from "axios";

export default function OrderData(props) {
  const [orders, setOrders] = useState(null);
  const [fil, setFil] = useState("Up");
  const [popup, setPopup] = useState(false);
  const [currentId, setCurrentId] = useState("");
  const currentUser = props.currentUser;
  const role = currentUser.map((el) => el.role);

  const filter = (col) => {
    if (fil === "Up") {
      const sorted = [...orders].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setOrders(sorted);
      setFil("Down");
    }
    if (fil === "Down") {
      const sorted = [...orders].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setOrders(sorted);
      setFil("Up");
    }
  };

  useEffect(() => {
    const url = "//localhost:3001/events";

    axios.get(url).then((res) => {
      const allOrders = res.data;
      setOrders(allOrders);
    });
  }, [setOrders]);

  if (!orders || orders.length === 0) return <p>Нет данных.</p>;

  const updatePost = async function (key) {
    await axios
      .patch(`http://localhost:3001/events/${key}`, { status: "Выполнен" })
      .then(() => {});

    await axios.get("//localhost:3001/events").then((res) => {
      const allOrders = res.data;
      setOrders(allOrders);
    });
  };

  const deletePost = async function () {
    await axios
      .delete(`http://localhost:3001/events/${currentId}`)
      .then(() => {});

    await axios.get("//localhost:3001/events").then((res) => {
      const allOrders = res.data;
      setOrders(allOrders);
    });
  };

  function openPopup(i) {
    setPopup(true);
    setCurrentId(i);
  }

  function closePopup() {
    setPopup(false);
  }

  const className = (i) => {
    if (i === "Выполнен") {
      return "done";
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Имя клиента</th>
            <th className="filter" onClick={() => filter("address")}>
              Адрес
            </th>
            <th className="filter" onClick={() => filter("date")}>
              Дата заказа
            </th>
            <th>Статус</th>
            <th>Комментарий</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(orders)
            ? orders.map((order) => (
                <tr className={className(order.status)} key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.name}</td>
                  <td>{order.address}</td>
                  <td>{order.date}</td>
                  <td>{order.status}</td>
                  <td>{order.comment}</td>
                  {role == "ADMIN" ? (
                    <>
                      <td className="table-button">
                        {order.status === "Новый" ? (
                          <button
                            className="lil-button"
                            onClick={() => updatePost(order.id)}
                          >
                            V
                          </button>
                        ) : (
                          <></>
                        )}
                        <button
                          className="lil-button"
                          onClick={() => openPopup(order.id)}
                        >
                          X
                        </button>
                      </td>
                      {popup ? (
                        <div className="pop-up">
                          <h2 className="pop-up-head">
                            Вы действительно хотите удалить заказ?
                          </h2>
                          <button
                            className="pop-up-button"
                            onClick={() => {
                              deletePost();
                              closePopup();
                            }}
                          >
                            Ok
                          </button>
                          <button onClick={() => closePopup()}>Отмена</button>
                        </div>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    console.log("Вы авторизовались как пользователь")
                  )}
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
}
