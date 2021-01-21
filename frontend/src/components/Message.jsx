function Message({ item, delete_message, userInfo }) {
  return (
    <p>
      {item.text}
      {userInfo.id === item.user ? (
        <button onClick={() => delete_message(item.id)}>X</button>
      ) : (
        ""
      )}
    </p>
  );
}

export default Message;
