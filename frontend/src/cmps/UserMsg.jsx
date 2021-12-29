import { useEffect, useState } from 'react';
import { eventBusService } from '../services/event-bus.service';
import { ReactComponent as CloseIcon } from '../assets/imgs/icons/general/icon-close.svg';
import { ReactComponent as ErrorIcon } from '../assets/imgs/icons/general/icon-errormsg.svg';
import { ReactComponent as SuccessIcon } from '../assets/imgs/icons/general/icon-successmsg.svg';

export const UserMsg = () => {
  const [msg, setMsg] = useState(null);
  let removeListener;

  useEffect(() => {
    removeListener = eventBusService.on('show-user-msg', msg => {
      setMsg(msg);
      setTimeout(() => { setMsg(null); }, 4000);
    });
    return () => {
      removeListener();
    };
  }, []);

  if (!msg) return <></>;
  else return (
    <section className={'user-msg flex wrap align-center space-between ' + msg.type}>
      <span className="msg-wrapper flex align-center">
      {msg.type === 'error' ?
        <ErrorIcon className="error" /> :
        (msg.type === 'success' ? <SuccessIcon className="success" /> : '')}
      {msg.input}
      </span>
      <button className="center-content" onClick={() => { setMsg(null); }}><CloseIcon /></button>
    </section>
  );
};