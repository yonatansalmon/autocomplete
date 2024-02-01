import { memo } from 'react';
import { ListItemProps } from '../types/interfaces';

const ListItem = ({ item, query }: ListItemProps) => {
  const regex = new RegExp(`(${query})`, 'gi');

  //Matching and extracting all letters of countries names that match the input value to bold them
  const parts = item.split(regex);
  return <span>{parts.map((part, i) => (part.toLowerCase() === query.toLowerCase() ? <b key={i}>{part}</b> : part))}</span>;
};

export default memo(ListItem);
