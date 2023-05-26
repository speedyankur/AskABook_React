import { EonUiIcon, EonUiLink, EonUiText } from "@eon-ui/eon-ui-components-react";
import cn from 'classnames';
import styles from './ChatItem.module.scss';
import { AUTHOR_BOT, BOT_ICON, USER_ICON, SOURCE_LABEL } from "../../shared/definitions/constants";
import { Answer } from "../../shared/definitions/types";

const ChatItem = ({ msg: { text, author, url } }: { msg: Answer }) => {
  const isBOT = author === AUTHOR_BOT;
  return (
    <div className={cn(styles.chatItem, { [styles.chatItemBot]: isBOT })}>
      <div className={cn(styles.chatItemText, { [styles.chatItemTextBot]: isBOT })}>
        <EonUiText fontWeight={`${isBOT ? '400' : '700'}`}>{text}</EonUiText>
        {url && <div className={styles.chatItemUrls}>
          <EonUiText textStyle="copy">{SOURCE_LABEL}</EonUiText>
          {url?.length && url?.map((item, index) => (
            <EonUiLink href={url[index]} iconPosition="right" target="_blank" text={url[index].split('/').pop()} key={index} scheme="darkgrey"></EonUiLink>
          ))}
        </div>
        }
      </div>
      <EonUiIcon name={`${isBOT ? BOT_ICON : USER_ICON}`} className={cn(styles.chatItemIcon, { [styles.chatItemIconBot]: isBOT })} size={`${isBOT ? 'normal' : 'small'}`} scheme="red" noSpace={false}></EonUiIcon>
    </div>
  );
};

export default ChatItem;
