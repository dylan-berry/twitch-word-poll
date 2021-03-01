const channelForm = document.querySelector('#channel-form');
const channelName = document.querySelector('#channel-name');
const connectBtn = document.querySelector('#connect-btn');
const errorMsg = document.querySelector('#error-message');

channelForm.addEventListener('submit', e => {
  e.preventDefault();
  errorMsg.hidden = false;
  // openConnection(channelName.value);
});

const openConnection = async channel => {
  const res = await fetch(`/channel/${channel}`);
  const data = await res.json();
  console.log(data.msg);
  if (data.msg === 'Connected') {
    connectBtn.textConent = 'Disconnect';
    errorMsg.hidden = true;
  } else if (data.msg === 'Disconnect') {
    connectBtn.textConent = 'Connect';
    errorMsg.hidden = true;
  } else {
    errorMsg.hidden = false;
  }
};
