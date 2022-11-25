const CronJob = require('cron').CronJob;
const job = new CronJob(
  '* * * * * *',
  async function () {
    try {
      const users = await User.aggregate([
        {
          $match: {
            $expr: {
              $and: [
                {
                  $eq: [
                    { $dayOfMonth: '$dateOfBirth' },
                    { $dayOfMonth: new Date() },
                  ],
                },
                { $eq: [{ $month: '$dateOfBirth' }, { $month: new Date() }] },
              ],
            },
          },
        },
      ]);
      // console.log(new Date() - 24 * 3600 * 1000);
      const allPromises = users.map((user) => user.sendMailBirthday());
      await Promise.all(allPromises);
    } catch (error) {
      console.log(error);
    }
  },
  null,
  true,
  'Asia/Ho_Chi_Minh'
);

job.start();
