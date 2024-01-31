export interface Country {
  name: { common: string; }; 
  flags: { png: string; svg: string; }; 
}

export interface ListItemProps {
  item: string;
  query: string;
}

export interface LoadingErrorProps {
  isLoading: boolean;
  error: string | null
}