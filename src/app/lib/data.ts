let messageOfTheDay = "";

export const getMessageOfTheDay = () => {
  return messageOfTheDay;
};
export const deleteMessageOfTheDay = () => {
  messageOfTheDay = "";
  return messageOfTheDay;
};

export const createMessageOfTheDay = (message: string) => {
  messageOfTheDay = message;
  return messageOfTheDay;
};
