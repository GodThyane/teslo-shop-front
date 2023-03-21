export const formatDate = (str: string): string => {
   const date = new Date(str);
   return date
      .toISOString()
      .replace('T', ' ')
      .replace(/\.\d{3}Z$/, '');
};
