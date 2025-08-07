const addOrUpdateMsg = (msgs, asstMsg, fullText) => {
  const msgExists = msgs.some((msg) => msg._id === asstMsg._id);
  let updatedMsgs = [];
  // console.log('prev', prev);
  if (!msgExists) {
    asstMsg.parts[0].text = fullText;
    updatedMsgs = [...msgs, asstMsg];
  } else {
    updatedMsgs = msgs.map((msg) =>
      msg._id === asstMsg._id
        ? {
            ...msg,
            parts: [{ ...msg.parts[0], text: msg.parts[0].text + fullText }],
          }
        : msg
    );
  }
  return updatedMsgs;
};

export { addOrUpdateMsg };
