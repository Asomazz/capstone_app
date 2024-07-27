const { default: instance } = require("..");

exports.sendNotification = async (_id, title, body) => {
  const { data } = await instance.post(
    `/notifications/sendNotification/${_id}`,
    {
      title: title,
      body: body,
    }
  );
  return data;
};
