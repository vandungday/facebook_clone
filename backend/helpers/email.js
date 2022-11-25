const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const ejs = require('ejs');
const { OAuth2 } = google.auth;
const oauth_link = 'https://developers.google.com/oauthplayground';
const { EMAIL, MAILLING_ID, MAILLING_SECRET, MAILLING_REFRESH } = process.env;

const auth = new OAuth2(
  MAILLING_ID,
  MAILLING_SECRET,
  MAILLING_REFRESH,
  oauth_link
);

exports.sendVerificationEmail = async (email, name, url) => {
  auth.setCredentials({
    refresh_token: MAILLING_REFRESH,
  });
  const accessToken = auth.getAccessToken();
  const stmp = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: EMAIL,
      clientId: MAILLING_ID,
      clientSecret: MAILLING_SECRET,
      refreshToken: MAILLING_REFRESH,
      accessToken,
    },
  });

  const html = await ejs.renderFile(`${__dirname}/../views/register.ejs`, {
    name,
    url,
  });

  const mailOptions = {
    from: EMAIL,
    to: email,
    subject: 'Facebook email verification',
    html,
  };

  stmp.sendMail(mailOptions, (err, res) => {
    if (err) return err;
    return res;
  });
};

exports.sendResetCode = async (email, name, code) => {
  auth.setCredentials({
    refresh_token: MAILLING_REFRESH,
  });
  const accessToken = auth.getAccessToken();
  const stmp = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: EMAIL,
      clientId: MAILLING_ID,
      clientSecret: MAILLING_SECRET,
      refreshToken: MAILLING_REFRESH,
      accessToken,
    },
  });

  const html = await ejs.renderFile(`${__dirname}/../views/reset.ejs`, {
    name,
    code,
  });

  const mailOptions = {
    from: EMAIL,
    to: email,
    subject: 'Reset facebook password',
    html,
  };
  stmp.sendMail(mailOptions, (err, res) => {
    if (err) return err;
    return res;
  });
};
