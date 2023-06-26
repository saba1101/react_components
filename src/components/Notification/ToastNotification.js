const createStyles = () =>{
    const style = document.createElement('style');
    style.setAttribute('id','toast_notification_style_key')
    style.innerHTML = `
        .notifications_wrapper{
           position: fixed;
           z-index: 9999999;
           display: flex;
           justify-content: center;
           align-items: flex-start;
           flex-direction: column;
           font-family: 'Helvetica_Regular';
        }
         .notifications_wrapper.top-left {
           top: 20px;
           left: 20px;
           align-items: flex-start;
        }
         .notifications_wrapper.top-right {
           top: 20px;
           right: 20px;
           align-items: flex-end;
        }
         .notifications_wrapper.bottom-left {
           bottom: 20px;
           left: 20px;
           align-items: flex-start;
        }
         .notifications_wrapper.bottom-right {
           bottom: 20px;
           right: 20px;
           align-items: flex-end;
        }
         .notifications_wrapper.top-center {
           top: 20px;
           left: 50%;
           transform: translate(-50%, 0);
        }
         .notifications_wrapper.bottom-center {
           bottom: 20px;
           left: 50%;
           transform: translate(-50%, 0);
        }
         .notifications_wrapper .toast_notification {
           min-width: 328px;
           max-width: 450px;
           min-height: 52px;
           border-radius: 6px;
           margin-top: 12px;
           transition: all 0.5s;
           box-shadow: 0 3px 20px 10px rgba(0, 0, 0, .1);
           word-break: break-all;
        }
         .notifications_wrapper .toast_notification.leave {
            animation: fadeOut 0.5s forwards;
        }
         .notifications_wrapper .toast_notification.enter {
           animation: fadeIn 0.5s forwards;
        }
         @keyframes fadeOut {
           from {
             opacity: 1;
             transform:translateY(0);
            }
            to {
              opacity: 0;
              transform:translateY(-30px)

            }
        }
         @keyframes fadeIn {
            from {
             opacity: 0;
             transform:translateY(30px)
            }
            to {
             opacity: 1;
             transform:translateY(0);
            }
        }
         .notifications_wrapper .toast_notification:first-child {
            margin-top: 0;
        }
         .notifications_wrapper .toast_notification .notification_content {
            padding: 16px 24px;
        }
         .notifications_wrapper .toast_notification .notification_content p {
             color: #fff;
             font-size: 14px;
             font-weight: 400;
             user-select: none;
            font-family: 'Helvetica_Neue_LT_GEO_Caps_400';
        }
         .notifications_wrapper .toast_notification.info {
            background: #4996fd;
        }
         .notifications_wrapper .toast_notification.warning {
            background: #ffc757;
        }
         .notifications_wrapper .toast_notification.success {
            background: #10b77f;
        }
         .notifications_wrapper .toast_notification.error {
            background: #ef4343;
        }
    `
    document.head.appendChild(style);
}

const clear_notification = (toast_id,timeout) => {
  setTimeout(() => {
    let target = document.querySelector(`#toast_notification_${toast_id}`)
    target.classList.remove('enter')
    target.classList.add('leave')
    setTimeout(() => {
      target.remove()
    },500)

  },timeout)
}

const createNotification = (text,type,timeout,position,max) => {
    if(document.querySelector('style[id="toast_notification_style_key"]')){
        document.querySelector('style[id="toast_notification_style_key"]').remove()
    }

    createStyles()

    let main = document.createElement('div')
    main.classList.add('notifications_wrapper',position ? position : 'bottom-right')
    const toast_id = crypto.randomUUID()
    let key = `data-key-${toast_id}`
    let notificationEL = document.querySelector('body > .notifications_wrapper')
    if(!notificationEL){
        document.querySelector('body').appendChild(main)
    }else{
      let previousClass = notificationEL.classList[1] ? notificationEL.classList[1] : ''
      notificationEL.classList.remove(previousClass)
      notificationEL.classList.add(position)
    }

    if(max && document.querySelector('.notifications_wrapper').childElementCount >= max) return

    let toast = document.createElement('div')
    let content = document.createElement('div')
    let notification_text = document.createElement('p')
    let notification_type = type ? type : 'info'
    toast.setAttribute('id',`toast_notification_${toast_id}`)
    toast.classList.add('toast_notification', notification_type,'enter')
    content.classList.add('notification_content')
    notification_text.textContent = text

    content.appendChild(notification_text)
    toast.appendChild(content)
    toast.setAttribute(`${key}`,'')
    content.setAttribute(`${key}`,'')
    notification_text.setAttribute(`${key}`,'')


    document.querySelector('body > .notifications_wrapper').appendChild(toast)
    clear_notification(toast_id,timeout ? timeout : 3500)
}

export {createNotification}

