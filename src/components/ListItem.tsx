import { memo } from 'react';
import { ListItemProps } from '../types/interfaces';


const ListItem = ({ item, query }: ListItemProps) => {
  const regex = new RegExp(`(${query})`, 'gi');
  const parts = item.split(regex);
  return <span>{parts.map((part, index) => (part.toLowerCase() === query.toLowerCase() ? <b key={index}>{part}</b> : part))}</span>;
};

export default memo(ListItem);
