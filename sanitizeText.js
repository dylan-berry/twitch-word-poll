const regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;

const sanitizeText = text => {
  text = text.trim().toLowerCase();
  text = text.replace(regex, '');

  return text;
};

module.exports = sanitizeText;
